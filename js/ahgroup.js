/* AH Group Entertainment */
(function(){
  "use strict";

  /* Menu movil */
  var hamb = document.querySelector('.hamb'), nav = document.querySelector('.nav');
  if (hamb && nav) {
    hamb.addEventListener('click', function(){
      var abierto = nav.getAttribute('data-abierto') === 'si';
      nav.setAttribute('data-abierto', abierto ? 'no' : 'si');
      hamb.setAttribute('aria-expanded', String(!abierto));
    });
  }

  /* Desplegable de servicios */
  document.querySelectorAll('.nav__desp').forEach(function(d){
    var b = d.querySelector('button');
    b.addEventListener('click', function(e){
      e.stopPropagation();
      var ab = d.getAttribute('data-abierto') === 'si';
      document.querySelectorAll('.nav__desp').forEach(function(o){ o.setAttribute('data-abierto','no'); });
      d.setAttribute('data-abierto', ab ? 'no' : 'si');
      b.setAttribute('aria-expanded', String(!ab));
    });
  });
  document.addEventListener('click', function(){
    document.querySelectorAll('.nav__desp').forEach(function(o){ o.setAttribute('data-abierto','no'); });
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') {
      document.querySelectorAll('.nav__desp').forEach(function(o){ o.setAttribute('data-abierto','no'); });
      if (nav) nav.setAttribute('data-abierto','no');
    }
  });

  /* Formulario de contacto (FormSubmit) */
  var form = document.getElementById('form-contacto');
  if (form) {
    var ok = document.getElementById('aviso-ok'), mal = document.getElementById('aviso-mal');
    var boton = form.querySelector('button[type="submit"]');
    var textoBoton = boton ? boton.textContent : '';
    form.addEventListener('submit', function(e){
      e.preventDefault();
      ok.setAttribute('data-ver','no'); mal.setAttribute('data-ver','no');
      if (boton) { boton.disabled = true; boton.textContent = form.dataset.enviando || 'Enviando...'; }
      fetch(form.dataset.destino, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      }).then(function(r){ return r.json(); }).then(function(d){
        if (d && (d.success === true || d.success === 'true')) { ok.setAttribute('data-ver','si'); form.reset(); }
        else { mal.setAttribute('data-ver','si'); }
      }).catch(function(){ mal.setAttribute('data-ver','si'); })
      .then(function(){ if (boton) { boton.disabled = false; boton.textContent = textoBoton; } });
    });
  }

  /* Recordar el idioma que el visitante elige a mano */
  document.querySelectorAll('.idioma a').forEach(function(a){
    a.addEventListener('click', function(){
      try { localStorage.setItem('ahg_idioma', a.getAttribute('data-idioma')); } catch (err) {}
    });
  });
})();

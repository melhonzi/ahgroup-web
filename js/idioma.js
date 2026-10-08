/* Deteccion de idioma en la raiz: es (por defecto) / pt / en */
(function(){
  var destino = 'es';
  try {
    var guardado = localStorage.getItem('ahg_idioma');
    if (guardado === 'es' || guardado === 'pt' || guardado === 'en') { destino = guardado; }
    else {
      var idiomas = navigator.languages || [navigator.language || 'es'];
      for (var i = 0; i < idiomas.length; i++) {
        var l = String(idiomas[i]).toLowerCase();
        if (l.indexOf('pt') === 0) { destino = 'pt'; break; }
        if (l.indexOf('en') === 0) { destino = 'en'; break; }
        if (l.indexOf('es') === 0) { destino = 'es'; break; }
      }
    }
  } catch (e) {}
  location.replace('/' + destino + '/');
})();

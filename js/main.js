/**
 * Inicialize map in project
 */
document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelectorAll('#map').length > 0) {
    if (document.querySelector('html').lang)
      lang = document.querySelector('html').lang;
    else
      lang = 'pt-br';


    var element;
    var cdn = new Array;

    cdn[0] = 'https://maps.googleapis.com/maps/api/js?callback=initMap&key=[API_KEY]&language=' + lang;
    cdn[1] = 'https://cdn.rawgit.com/googlemaps/v3-utility-library/master/markerwithlabel/src/markerwithlabel.js';

    for (var i in cdn) {
      element = document.createElement('script');
      element.setAttribute('type', 'text/javascript');
      element.setAttribute('src', cdn[i]);
      document.body.appendChild(element);
    }
  }
});
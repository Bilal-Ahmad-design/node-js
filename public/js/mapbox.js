/* eslint-disable */


export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYmlsYWwtYWhtYWQtdWJ1bnR1IiwiYSI6ImNrdXdvazNmYzQ2dGYycW82cm5mOXRjZG8ifQ.WauZDINghnHPLnjSlLCawA';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/bilal-ahmad-ubuntu/ckuwpb8b12kt118o63qip03sx',
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    bounds.extends(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};

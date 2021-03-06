mapboxgl.accessToken = 'pk.eyJ1Ijoid2VzdGZpZWxkbnkiLCJhIjoiY2pjeGxqcjhiMGljYzMzbzE0eXB6Z3ozYiJ9.VEtcYyEyNf1N2huTqRXElQ';

var bounds = [
    [-80.098094, 41.808723], // Southwest coordinates
    [-78.803060, 42.664566]  // Northeast coordinates
];

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/westfieldny/cjcxob2e71c352smnmnuscxbn',
    center: [-79.585621, 42.329138],
    zoom: 13,
    minZoom: 10,
    maxBounds: bounds
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

map.on('load', function () {

  // Mouse hoverover popups on features
  map.on("mousemove", function (e) {
      var features = map.queryRenderedFeatures(e.point, {
          layers: ["organizations", "points", "events"]
      });

      if (features.length && features[0].properties.title) {
          document.getElementById('region-hover').innerHTML = "<div class='region-tooltip' style='z-index:1;padding:10px 20px;border-radius:4px;background-color:" + features[0].properties.color + ";left:" + (e.point.x + 15) + "px;top:" + (e.point.y - 50) + "px;position:absolute;'>" + features[0].properties.title + "</div>";
      } else if (features.length && features[0].properties.type) {
        document.getElementById('region-hover').innerHTML = "<div class='region-tooltip' style='z-index:1;padding:10px 20px;border-radius:4px;background-color:white;left:" + (e.point.x + 15) + "px;top:" + (e.point.y - 50) + "px;position:absolute;'><p><small><span class='legend-dot " + features[0].properties.status.replace(/\s+/g, '-').toLowerCase() + "' ></span>" + features[0].properties.status + "</small></p>" + features[0].properties.name + "</div>";
      } else if (features.length && features[0].properties.name) {
        document.getElementById('region-hover').innerHTML = "<div class='region-tooltip' style='z-index:1;padding:10px 20px;border-radius:4px;background-color:white;left:" + (e.point.x + 15) + "px;top:" + (e.point.y - 50) + "px;position:absolute;'>" + features[0].properties.name + "</div>";
      } else {
          //if not hovering over a feature set tooltip to empty
          document.getElementById('region-hover').innerHTML = "";
      }
  });

   // FEATURED BUSINESSES
   map.addSource("organizations", {
     "type": "geojson",
     "data": "https://westfieldny.com/api/geojson/featured_organizations"
   });
   map.addLayer({
     "id": "organizations",
     "type": "symbol",
     "source": "organizations",
     "layout": {
            "icon-image": "suitcase-15",
            "icon-allow-overlap": true
          }
    });
    map.on('click', 'organizations', function (e) {
      var projectUrl = 'https://westfieldny.com' + e.features[0].properties.path;
      if (e.features[0].properties.image.length > 5) {
        var projectImg = '<img src="https://westfieldny.com' + e.features[0].properties.image + '" alt="' + e.features[0].properties.name + '" class="card-img-top">';
      } else {
        var projectImg = '';
      }
      var projectInfo = e.features[0].properties.categories;
      var projectLabel = e.features[0].properties.name;
      new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML('<div class="card"><a href="' + projectUrl + '" target="_parent">' + projectImg + '</a><div class="card-body"><a href="' + projectUrl + '" target="_parent"><p class="lead card-title">' + projectLabel + '</p></a><p class="card-text">' + projectInfo + '</p></div></div>')
          .addTo(map);
    });
    map.on('mouseenter', 'organizations', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'organizations', function () {
        map.getCanvas().style.cursor = '';
    });

    // FEATURED POINTS
    map.addSource("points", {
      "type": "geojson",
      "data": "https://westfieldny.com/api/geojson/featured_points"
    });
    map.addLayer({
      "id": "points",
      "type": "symbol",
      "source": "points",
      "layout": {
        "icon-image": "map-marker-15",
        "icon-allow-overlap": true
      }
     });
     map.on('click', 'points', function (e) {
       var projectUrl = 'https://westfieldny.com' + e.features[0].properties.path;
       if (e.features[0].properties.image.length > 5) {
         var projectImg = '<img src="https://westfieldny.com' + e.features[0].properties.image + '" alt="' + e.features[0].properties.name + '" class="card-img-top">';
       } else {
         var projectImg = '';
       }
       var projectInfo = e.features[0].properties.categories;
       var projectLabel = e.features[0].properties.name;
       new mapboxgl.Popup()
           .setLngLat(e.lngLat)
           .setHTML('<div class="card"><a href="' + projectUrl + '" target="_parent">' + projectImg + '</a><div class="card-body"><a href="' + projectUrl + '" target="_parent"><p class="lead card-title">' + projectLabel + '</p></a><p class="card-text">' + projectInfo + '</p></div></div>')
           .addTo(map);
     });
     map.on('mouseenter', 'points', function () {
         map.getCanvas().style.cursor = 'pointer';
     });
     map.on('mouseleave', 'points', function () {
         map.getCanvas().style.cursor = '';
     });

     // FEATURED EVENTS
     map.addSource("events", {
       "type": "geojson",
       "data": "https://westfieldny.com/api/geojson/featured_events"
     });
     map.addLayer({
       "id": "events",
       "type": "symbol",
       "source": "events",
       "layout": {
         "icon-image": "star-15",
         "icon-allow-overlap": true
       }
      });
      map.on('click', 'events', function (e) {
        var projectUrl = 'https://westfieldny.com' + e.features[0].properties.path;
        if (e.features[0].properties.image.length > 5) {
          var projectImg = '<img src="https://westfieldny.com' + e.features[0].properties.image + '" alt="' + e.features[0].properties.name + '" class="card-img-top">';
        } else {
          var projectImg = '';
        }
        var projectInfo = e.features[0].properties.when + ' | ' + e.features[0].properties.where;
        var projectLabel = e.features[0].properties.name;
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<div class="card"><a href="' + projectUrl + '" target="_parent">' + projectImg + '</a><div class="card-body"><a href="' + projectUrl + '" target="_parent"><p class="lead card-title">' + projectLabel + '</p></a><p class="card-text">' + projectInfo + '</p></div></div>')
            .addTo(map);
      });
      map.on('mouseenter', 'events', function () {
          map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'events', function () {
          map.getCanvas().style.cursor = '';
      });

});

// TOGGLERS
var toggleableLayers = [{label:'Points of Interest', id:'points', defaultState:'checked'}, {label:'Upcoming Events', id:'events', defaultState:'checked'}, {label:'Businesses', id:'organizations', defaultState:'checked'}];

function toggleLayer(layerId) {
  var clickedLayer = layerId;

  var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

  if (visibility === 'visible') {
      map.setLayoutProperty(clickedLayer, 'visibility', 'none');
      this.className = '';
  } else {
      this.className = 'active';
      map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
  }
};

for (var i = 0; i < toggleableLayers.length; i++) {
    var layer = toggleableLayers[i];

    var checkbox = document.createElement('div');
    checkbox.innerHTML = '<label class="switch">&nbsp;<input onclick="toggleLayer(\'' + layer.id + '\')" data="lwrpRegion" id="' + layer.id + '" type="checkbox" ' + layer.defaultState + '><span class="slider round"></span></label> ' + layer.label;

    var layers = document.getElementById('menu');
    layers.appendChild(checkbox);
}

// Toggle filters block mobile

// Function to toggle with Jquery
$.fn.toggleClick = function(){
    var methods = arguments, // store the passed arguments for future reference
        count = methods.length; // cache the number of methods

    //use return this to maintain jQuery chainability
    return this.each(function(i, item){
        // for each element you bind to
        var index = 0; // create a local counter for that element
        $(item).click(function(){ // bind a click handler to that element
            return methods[index++ % count].apply(this,arguments); // that when called will apply the 'index'th method to that element
            // the index % count means that we constrain our iterator between 0 and (count-1)
        });
    });
};

function inFilters() {
  $('.filters-block').addClass( "active" );
  $('#toggleFilters').addClass( "active" );
}
function outFilters() {
  $('.filters-block').removeClass( "active" );
  $('#toggleFilters').removeClass( "active" );
}
$('#toggleFilters').toggleClick(inFilters, outFilters);

// Toggle stats block
function inStats() {
  $('.figures-block').addClass( "active" );
  $('#toggleStats').addClass( "active" );
}
function outStats() {
  $('.figures-block').removeClass( "active" );
  $('#toggleStats').removeClass( "active" );
}
$('#toggleStats').toggleClick(inStats, outStats);

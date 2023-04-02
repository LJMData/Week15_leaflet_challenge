// Create an API endpoint to collect Data 
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//Request and log the Data 
d3.json(url).then(function(data){
    console.log(data)

    //Input the Data into the createFeature function
    createFeatures(data.features);
});

//Create a function for the Marker Size
function markerSize(magnitude) {
    return magnitude * 7500;
};

//Create a function for the Marker Color
function chooseColor(depth){
    if (depth < 10) return "purple";
  else if (depth < 30) return "blue";
  else if (depth < 50) return "darkblue";
  else if (depth < 70) return "orange";
  else if (depth < 90) return "red";
  else return "darkred";
}

//Create a function for Earthquake Data
function createFeatures(earthquakeData) {

    //Create a popup function
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
      }

    //Create a layer to hold the data 
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: function(feature, latlng) {

            //Set the marker Style
            var markers = {
                radius: markerSize(feature.properties.mag),
                fillColor: chooseColor(feature.geometry.coordinates[2]),
                fillOpacity: 0.5,
                color: "gray",
                stroke: true,
                weight: 0.5
              }
              return L.circle(latlng,markers);
            }
          });
        
    //Link the data to the map
    createMap(earthquakes);
}

//Create a function for making the actual Map
function createMap(earthquakes) {

    // Create the base layers.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    // Create a baseMaps object.
    var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
    };

    // Create an overlay object to hold our overlay.
    var overlayMaps = {
    Earthquakes: earthquakes
    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    var myMap = L.map("map", {
    center: [
        37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
    });

    // Add legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function (myMap) {
    var div = L.DomUtil.create("div", "legend");
    var labels = ["<strong>Depth</strong>"];
    var depths = [-10, 10, 30, 50, 70, 90];
    var colors = ["purple", "blue", "darkblue", "orange", "red", "darkred"];

    for (var i = 0; i < depths.length; i++) {
        div.innerHTML +=
        labels.push(
            '<i style="background:' +
            colors[i] +
            '"></i> ' +
            depths[i] +
            (depths[i + 1] ? "&ndash;" + depths[i + 1] + "<br>" : "+")
        );
    }
    div.innerHTML = labels.join("<br>");
    return div;
    };

    legend.addTo(myMap);

    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
    }).addTo(myMap);
}


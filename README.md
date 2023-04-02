# Week15_leaflet_challenge

This code creates an interactive map that displays earthquake data collected by the United States Geological Survey (USGS).
The data is collected from the USGS API endpoint, which is located at https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson.

## Functions
The code contains several functions:

### markerSize
This function takes in the magnitude of an earthquake and returns a marker size for that earthquake.

### chooseColor
This function takes in the depth of an earthquake and returns a marker color for that earthquake based on its depth.

### createFeatures
This function takes in the earthquake data and creates a layer on the map with markers for each earthquake.

### onEachFeature
This function creates a popup for each marker that displays the location, date, magnitude, and depth of the earthquake.

### createMap
This function creates the actual map and adds the base layers and overlay layers to it. It also adds a legend and layer control to the map.

### Map Layers
The map contains two base layers: a street map and a topographic map. The overlay layer displays the earthquake data with markers that vary in size and color based on the magnitude and depth of the earthquake.

### Legend
The legend displays the depth ranges for the earthquake markers and their corresponding colors. The legend is located in the bottom right corner of the map.
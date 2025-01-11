// Initialize the map
const map = L.map("map").setView([0, 0], 2); // Center the map on (0, 0) with zoom level 2

// Add a tile layer (Mapbox or OpenStreetMap)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Sea level rise data (this could be more complex depending on your dataset)
const seaLevelRiseData = {
  0: {
    // at 0 meters of sea level rise
    color: "rgba(255, 255, 255, 0)",
    opacity: 0,
  },
  1: {
    // at 1 meter of sea level rise
    color: "rgba(0, 0, 255, 0.2)",
    opacity: 0.2,
  },
  2: {
    // at 2 meters of sea level rise
    color: "rgba(0, 0, 255, 0.4)",
    opacity: 0.4,
  },
  3: {
    // at 3 meters of sea level rise
    color: "rgba(0, 0, 255, 0.6)",
    opacity: 0.6,
  },
  // Add more levels as required
};

// Create a polygon to represent the land area and adjust the sea level rise effect
const landArea = L.geoJSON(landGeoData, {
  style: function (feature) {
    return {
      fillColor: seaLevelRiseData[0].color,
      weight: 1,
      opacity: seaLevelRiseData[0].opacity,
      fillOpacity: seaLevelRiseData[0].opacity,
    };
  },
}).addTo(map);

// Function to update the sea level rise on the map based on slider
const seaLevelSlider = document.getElementById("seaLevel");
const seaLevelValue = document.getElementById("seaLevelValue");

seaLevelSlider.addEventListener("input", function () {
  const level = parseFloat(seaLevelSlider.value);
  seaLevelValue.textContent = level.toFixed(1) + " m";

  // Adjust the color based on the sea level rise value
  if (seaLevelRiseData[level]) {
    landArea.setStyle({
      fillColor: seaLevelRiseData[level].color,
      opacity: seaLevelRiseData[level].opacity,
      fillOpacity: seaLevelRiseData[level].opacity,
    });
  }
});

// Example GeoJSON data for land areas (you can use real data or simplified polygons)
const landGeoData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-180, -90],
            [180, -90],
            [180, 90],
            [-180, 90],
            [-180, -90],
          ],
        ],
      },
      properties: {
        name: "World",
      },
    },
  ],
};

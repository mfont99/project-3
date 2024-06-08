let myMap = L.map("map", {
    center: [37.8, -96],
    zoom: 4
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Load the filtered data
const url = "https://raw.githubusercontent.com/mfont99/project-3/david/Resources/merged_data.geojson";
d3.json(url).then(data => {
    initializeMap(data);
}).catch(error => {
    console.error("There was a problem with fetching or processing the data:", error);
});

function initializeMap(data) {
    const years = [...new Set(data.features.map(feature => feature.properties.Year))].sort();
    const yearSelect = document.getElementById('year-select');

    // Populate the dropdown menu with years
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    });

    // Add event listener to filter data based on the selected year
    yearSelect.addEventListener('change', function () {
        const selectedYear = this.value;
        updateMarkers(data, selectedYear);
    });

    // Initialize markers for the first year in the dropdown
    updateMarkers(data, years[0]);
}

function updateMarkers(data, year) {
    // Clear existing markers
    myMap.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            myMap.removeLayer(layer);
        }
    });

    // Filter data based on the selected year
    const filteredData = data.features.filter(feature => feature.properties.Year == year);

    // Add markers to the map
    filteredData.forEach(feature => {
        const coordinates = feature.geometry.coordinates;
        const properties = feature.properties;
        const marker = L.marker([coordinates[1], coordinates[0]]).addTo(myMap);
        marker.bindPopup(`<strong>County:</strong> ${properties.County}<br><strong>Population:</strong> ${properties.Population}`);
    });
}
let myMap = L.map("map", {
    center: [37.8, -96],
    zoom: 4
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  // Load the filtered data
fetch('../project-3/Resources/merged_data.json')
.then(response => response.json())
.then(data => {
    var years = [...new Set(data.map(item => item.Year))];
    var yearSelect = document.getElementById('year-select');

    // Populate the dropdown menu with years
    years.forEach(year => {
        var option = document.createElement('option');
        option.value = year;
        option.text = year;
        yearSelect.appendChild(option);
    });

    // Function to update the map based on selected year
    function updateMap(selectedYear) {
        // Clear existing markers
        map.eachLayer((layer) => {
            if (!!layer.toGeoJSON) {
                map.removeLayer(layer);
            }
        });
        // Add the tile layer back
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Filter data based on the selected year
        var filteredData = data.filter(item => item.Year == selectedYear);

        // Add markers to the map
        filteredData.forEach(item => {
            var lat = item.lat;
            var lon = item.lng;
            var rate = item["Est. Age-Adj death rate (in ranges)"];
            var county = item.County;

            // Only add marker if lat and lon are available
            if (lat && lon) {
                L.marker([lat, lon])
                    .bindPopup(`<b>County:</b> ${county}<br><b>Rate:</b> ${rate}`)
                    .addTo(map);
            }
        });
    }

    // Add an event listener for the dropdown menu
    yearSelect.addEventListener('change', (event) => {
        var selectedYear = event.target.value;
        updateMap(selectedYear);
    });

    // Initialize the map with the first year in the dropdown
    updateMap(yearSelect.value);
})
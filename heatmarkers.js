document.addEventListener('DOMContentLoaded', () => {
    const map2 = L.map('map2').setView([37.8, -96], 4);
    const geojsonDataUrl = 'https://raw.githubusercontent.com/mfont99/project-3/david/Resources/All_data.geojson';
    let geojsonLayer;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map2);

    fetch(geojsonDataUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Data fetched successfully:", data); // Debugging

            // Populate the dropdown menu
            const years = [...new Set(data.features.map(feature => feature.properties.Year))].sort((a, b) => a - b);
            const yearSelect2 = document.getElementById('year-select2');
            if (!yearSelect2) {
                console.error("year-select2 element not found");
                return;
            }
            years.forEach(year => {
                const option = document.createElement('option');
                option.value = year;
                option.text = year;
                yearSelect2.add(option);
            });

            yearSelect2.addEventListener('change', (event) => {
                const selectedYear = event.target.value;
                updateMap2(selectedYear, data);
            });

            // Initial map update with the first year
            updateMap2(years[0], data);
        })
        .catch(error => {
            console.error("Error fetching GeoJSON data:", error); // Debugging
        });

    function updateMap2(year, data) {
        if (geojsonLayer) {
            map2.removeLayer(geojsonLayer);
        }

        const filteredData = {
            ...data,
            features: data.features.filter(feature => feature.properties.Year == year)
        };

        geojsonLayer = L.geoJson(filteredData, {
            pointToLayer: (feature, latlng) => {
                return L.circleMarker(latlng, {
                    radius: 5,
                    fillColor: getColorBin(feature.properties['Est. Age-Adj death rate (in ranges)']),
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                });
            }
        }).addTo(map2);
        console.log("Map updated for year:", year); // Debugging
    }

    function getColorBin(deathRate) {
        // Parse death rate from string to a numerical value
        let value = parseFloat(deathRate.split('-')[0]);
        if (isNaN(value)) {
            return '#cccccc'; // Default color for undefined ranges
        }
        return value <= 10 ? '#00FF00' :    // Green
               value <= 20 ? '#0000FF' :    // Blue
               value <= 30 ? '#FFA500' :    // Orange
                             '#FF0000';     // Red
    }

    // Legend
    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map2) {
        const div = L.DomUtil.create('div', 'legend');
        const grades = ['0-10', '10.1-20', '20.1-30', '>30'];
        const colors = ['#00FF00', '#0000FF', '#FFA500', '#FF0000'];
        for (let i = 0; i < grades.length; i++) {
            div.innerHTML += '<i style="background:' + colors[i] + '"></i> ' + grades[i] + '<br>';
        }
        return div;
    };

    legend.addTo(map2);
});

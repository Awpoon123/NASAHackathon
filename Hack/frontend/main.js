// Initialize Leaflet Map
const leafletMap = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(leafletMap);

let selectedLocation;

// Handle Leaflet map click
leafletMap.on('click', function(e) {
    selectedLocation = e.latlng;
    L.marker(selectedLocation).addTo(leafletMap).bindPopup('Selected Location').openPopup();
});

// Handle form submission
document.getElementById('observationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const groundMeasurement = document.getElementById('groundMeasurement').value;

    if (!selectedLocation) {
        alert("Please select a location on the map.");
        return;
    }

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ location: selectedLocation, measurement: groundMeasurement })
        });

        if (response.ok) {
            document.getElementById('notificationArea').innerText = 'Successfully registered!';
            fetchLandsatData();
        } else {
            throw new Error('Registration failed.');
        }
    } catch (error) {
        console.error(error);
        document.getElementById('notificationArea').innerText = 'Error: ' + error.message;
    }
});

// Fetch Landsat data (dummy function)
async function fetchLandsatData() {
    try {
        const response = await fetch('/landsat-data'); // Adjust endpoint as necessary
        const data = await response.json();
        displayLandsatData(data);
    } catch (error) {
        console.error('Error fetching Landsat data:', error);
    }
}

// Display Landsat data using Chart.js
function displayLandsatData(data) {
    const ctx = document.getElementById('visualizationChart').getContext('2d');
    const labels = data.map(item => item.date); // Example: replace with actual data
    const values = data.map(item => item.value); // Example: replace with actual data

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Landsat Measurements',
                data: values,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: 'Date' } },
                y: { title: { display: true, text: 'Value' } }
            }
        }
    });
}

// Google Maps integration
function initGoogleMap() {
    const googleMap = new google.maps.Map(document.getElementById("googleMap"), {
        center: { lat: -34.397, lng: 150.644 }, // Default center
        zoom: 8
    });

    const googleMarker = new google.maps.Marker({
        position: googleMap.getCenter(),
        map: googleMap,
        draggable: true
    });

    google.maps.event.addListener(googleMarker, 'dragend', function(event) {
        const lat = event.latLng.lat().toFixed(6);
        const lng = event.latLng.lng().toFixed(6);
        document.getElementById("location").value = `${lat}, ${lng}`;
    });
}
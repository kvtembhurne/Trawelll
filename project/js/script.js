// Smooth Scroll for Anchor Links
document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll-Based Animations
const sections = document.querySelectorAll('section');
const options = { threshold: 0.3 };

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

// Form Submission Alert
const donationForm = document.getElementById('donationForm');
if (donationForm) {
    donationForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const amount = document.getElementById('amount').value;
        if (amount > 0) {
            alert(`Thank you for your generous donation of $${amount}!`);
        } else {
            alert('Please enter a valid donation amount.');
        }
    });
}

// Scroll-to-Top Button
const scrollButton = document.querySelector('.floating-button');
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollButton.style.display = 'block';
    } else {
        scrollButton.style.display = 'none';
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Initialize the map
const map = L.map('map').setView([20.5937, 78.9629], 5); // Center on India

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
}).addTo(map);

// Add a default marker
L.marker([28.6139, 77.2090]) // Example: New Delhi
    .addTo(map)
    .bindPopup('New Delhi<br>Capital of India.')
    .openPopup();

// Functionality: Add marker on user input
document.getElementById('addMarker').addEventListener('click', () => {
    const location = document.getElementById('location').value;
    if (location) {
        // Geocode user input (basic)
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const lat = data[0].lat;
                    const lon = data[0].lon;

                    // Add marker to map
                    L.marker([lat, lon])
                        .addTo(map)
                        .bindPopup(`${location}<br>Latitude: ${lat}, Longitude: ${lon}`)
                        .openPopup();

                    // Re-center the map
                    map.setView([lat, lon], 10);
                } else {
                    alert('Location not found! Please try another.');
                }
            })
            .catch(err => console.error('Error fetching location:', err));
    } else {
        alert('Please enter a location!');
    }
});

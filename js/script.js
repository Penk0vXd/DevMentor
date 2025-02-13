// Initialize Google Map
function initMap() {
    // Coordinates for Sofia, Bulgaria
    const sofia = { lat: 42.697866, lng: 23.321590 };
    
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: sofia,
    });

    // Add marker
    const marker = new google.maps.Marker({
        position: sofia,
        map: map,
        title: 'Нашият офис'
    });
}

// Initialize map when the page loads
window.onload = initMap;

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Here you would typically send the form data to your server
    // For now, we'll just log it to the console
    console.log('Form submitted:', formData);
    
    // Clear the form
    this.reset();
    
    // Show success message
    alert('Благодарим ви! Вашето съобщение беше изпратено успешно.');
});

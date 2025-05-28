// инициализация на google карта
function initMap() {
    if (typeof google === 'undefined' || !document.getElementById('map')) {
        console.log('Google Maps API not loaded or map element missing');
        return;
    }

    const school = { lat: 42.6978, lng: 26.3216 };

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: school,
        styles: [
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{"saturation": 36}, {"color": "#333333"}, {"lightness": 40}]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16}]
            }
        ]
    });

    const marker = new google.maps.Marker({
        position: school,
        map: map,
        title: 'СУ "Йордан Йовков"'
    });

    const infoWindow = new google.maps.InfoWindow({
        content: '<div style="padding: 10px;"><h3>СУ "Йордан Йовков"</h3><p>Кв. ж.к. Българка, 8800 Сливен</p><p>Тел: 044 667 244</p></div>'
    });

    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}

window.onload = initMap;

// emailjs конфигурация
const EMAILJS_CONFIG = {
    userID: 'z0C3jV7KmRGwsEXeb',
    serviceID: 'service_bqg7el9',
    adminTemplateID: 'template_ep9g13g',
    autoReplyTemplateID: 'template_w4g7jgc'
};

// валидация на имейл
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// валидация на формата
function validateForm(formData) {
    if (!formData.name.trim()) {
        return { isValid: false, error: 'моля въведете вашето име' };
    }
    
    if (!formData.email.trim()) {
        return { isValid: false, error: 'моля въведете вашия имейл' };
    }
    
    if (!validateEmail(formData.email)) {
        return { isValid: false, error: 'моля въведете валиден имейл адрес' };
    }
    
    if (!formData.subject) {
        return { isValid: false, error: 'моля изберете тема' };
    }
    
    if (!formData.message.trim()) {
        return { isValid: false, error: 'моля въведете съобщение' };
    }
    
    if (formData.message.trim().length < 10) {
        return { isValid: false, error: 'съобщението трябва да е поне 10 символа' };
    }
    
    return { isValid: true };
}

// актуализация на бутона
function updateSubmitButton(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> изпращане...';
        button.style.opacity = '0.7';
    } else {
        button.disabled = false;
        button.innerHTML = '<i class="fas fa-paper-plane"></i> изпрати съобщение';
        button.style.opacity = '1';
    }
}

// изпращане на имейл към администратора
function sendAdminEmail(form) {
    return emailjs.sendForm(
        EMAILJS_CONFIG.serviceID,
        EMAILJS_CONFIG.adminTemplateID,
        form
    );
}

// изпращане на автоматичен отговор към потребителя
function sendAutoReply(form) {
    return emailjs.sendForm(
        EMAILJS_CONFIG.serviceID,
        EMAILJS_CONFIG.autoReplyTemplateID,
        form
    );
}

// основен обработчик за формата
document.addEventListener('DOMContentLoaded', function() {
    // инициализация на emailjs
    emailjs.init(EMAILJS_CONFIG.userID);
    
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        console.error('contact form not found');
        return;
    }

    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        
        // събиране на данните от формата
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // валидация
        const validation = validateForm(formData);
        if (!validation.isValid) {
            alert(validation.error);
            return;
        }
        
        // актуализация на бутона
        updateSubmitButton(submitBtn, true);
        
        try {
            // изпращане на имейл към администратора
            console.log('изпращане на имейл към администратора...');
            await sendAdminEmail(this);
            
            // изпращане на автоматичен отговор към потребителя
            console.log('изпращане на автоматичен отговор...');
            await sendAutoReply(this);
            
            // успешно изпращане
            alert('благодарим ви съобщението беше изпратено успешно');
            contactForm.reset();
            
        } catch (error) {
            console.error('грешка при изпращането:', error);
            alert('възникна грешка при изпращането моля опитайте отново');
        } finally {
            updateSubmitButton(submitBtn, false);
        }
    });
    
    // валидация в реално време
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const value = this.value.trim();
            
            if (this.hasAttribute('required') && !value) {
                this.style.borderColor = '#dc3545';
                this.style.boxShadow = '0 0 0 0.2rem rgba(220, 53, 69, 0.25)';
            } else if (this.type === 'email' && value) {
                if (validateEmail(value)) {
                    this.style.borderColor = '#28a745';
                    this.style.boxShadow = '0 0 0 0.2rem rgba(40, 167, 69, 0.25)';
                } else {
                    this.style.borderColor = '#dc3545';
                    this.style.boxShadow = '0 0 0 0.2rem rgba(220, 53, 69, 0.25)';
                }
            } else if (value) {
                this.style.borderColor = '#28a745';
                this.style.boxShadow = '0 0 0 0.2rem rgba(40, 167, 69, 0.25)';
            } else {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#007bff';
            this.style.boxShadow = '0 0 0 0.2rem rgba(0, 123, 255, 0.25)';
        });
    });
});
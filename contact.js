// Helper functions
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorElement);
    }
    input.classList.add('error-input');
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const interest = document.getElementById('interest');
    const message = document.getElementById('message');

    // Reset previous errors
    name.classList.remove('error');
    email.classList.remove('error');
    message.classList.remove('error');
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.remove());

    // Validation
    let isValid = true;
    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    }
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    }
    if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
    }

    if (isValid) {
        fetch('http://localhost:8080/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                phone: phone.value,
                interest: interest.value,
                message: message.value
            })
        })
        .then(res => {
            if (!res.ok) throw new Error(res.statusText);
            return res.text();
        })
        .then(msg => {
            alert(msg);
            this.reset();
        })
        .catch(err => {
            alert('Error: ' + (err.message || 'Failed to submit. Please try again.'));
        });
    } else {
        alert('Please fill in all required fields correctly.');
    }
});

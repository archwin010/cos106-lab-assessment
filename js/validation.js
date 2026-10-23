// ==========================================
// CONTACT FORM VALIDATION MODULE (validation.js)
// ==========================================

function validateAndSubmitForm(event) {
    event.preventDefault();

    // 1. Extract input values
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    const fullname = fullnameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const message = messageInput.value.trim();

    // 2. Error message UI elements
    const fullnameError = document.getElementById('fullname-error');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');
    const messageError = document.getElementById('message-error');

    let isValid = true;

    // 3. Full Name Validation (Ensures only letters, spaces, hyphens, and apostrophes are allowed)
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    if (fullname === '') {
        fullnameError.textContent = 'Full name is required.';
        fullnameInput.classList.add('input-error');
        isValid = false;
    } else if (!nameRegex.test(fullname)) {
        fullnameError.textContent = 'Full name can only contain letters, spaces, hyphens, or apostrophes.';
        fullnameInput.classList.add('input-error');
        isValid = false;
    } else {
        fullnameError.textContent = '';
        fullnameInput.classList.remove('input-error');
    }

    // 4. Email Address Validation (Standard regex pattern)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        emailError.textContent = 'Email address is required.';
        emailInput.classList.add('input-error');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        emailInput.classList.add('input-error');
        isValid = false;
    } else {
        emailError.textContent = '';
        emailInput.classList.remove('input-error');
    }

    // 5. Phone Number Validation (Digits only check)
    const phoneRegex = /^\d+$/;
    if (phone === '') {
        phoneError.textContent = 'Phone number is required.';
        phoneInput.classList.add('input-error');
        isValid = false;
    } else if (!phoneRegex.test(phone)) {
        phoneError.textContent = 'Phone number must contain digits only.';
        phoneInput.classList.add('input-error');
        isValid = false;
    } else {
        phoneError.textContent = '';
        phoneInput.classList.remove('input-error');
    }

    // 6. Message Validation
    if (message === '') {
        messageError.textContent = 'Message content cannot be blank.';
        messageInput.classList.add('input-error');
        isValid = false;
    } else {
        messageError.textContent = '';
        messageInput.classList.remove('input-error');
    }

    // 7. Final Submission Handling
    if (isValid) {
        alert('Thank you! Your message has been sent successfully.');
        DOM.contactForm.reset();
    }
}

function initValidationEvents() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', validateAndSubmitForm);
    }
}

initValidationEvents();
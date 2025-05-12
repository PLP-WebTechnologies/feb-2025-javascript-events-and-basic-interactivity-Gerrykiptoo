// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // ===== SECTION 1: EVENT HANDLING =====
    
    // Button Click Event
    const clickButton = document.getElementById('click-button');
    const clickResult = document.getElementById('click-result');
    
    clickButton.addEventListener('click', function() {
        clickResult.textContent = 'Button clicked! 🎉';
        clickResult.style.color = '#2575fc';
        
        // Add animation
        clickResult.style.animation = 'fadeIn 0.5s ease';
        
        // Reset animation after it completes
        setTimeout(() => {
            clickResult.style.animation = '';
        }, 500);
    });
    
    // Hover Effect (already handled in CSS, but we can add more functionality)
    const hoverElement = document.getElementById('hover-element');
    
    hoverElement.addEventListener('mouseenter', function() {
        this.innerHTML = '<p>Hover effect activated! 🌟</p>';
    });
    
    hoverElement.addEventListener('mouseleave', function() {
        this.innerHTML = '<p>Hover over me!</p>';
    });
    
    // Keypress Detection
    const keyInput = document.getElementById('key-input');
    const keyOutput = document.getElementById('key-output');
    
    keyInput.addEventListener('keyup', function(event) {
        keyOutput.textContent = `Key pressed: "${event.key}" (Key code: ${event.keyCode})`;
        keyOutput.style.color = '#2575fc';
        
        // Change background color based on key pressed
        const hue = (event.keyCode * 2) % 360;
        keyInput.style.backgroundColor = `hsla(${hue}, 70%, 95%, 0.3)`;
    });
    
    // Bonus: Secret Action (Double-click)
    const secretElement = document.getElementById('secret-element');
    
    secretElement.addEventListener('dblclick', function() {
        this.style.backgroundColor = '#6a11cb';
        this.style.color = 'white';
        this.innerHTML = '<p>🎁 You found the secret! 🎁</p>';
        this.style.animation = 'pulse 1s infinite';
        
        // Reset after 3 seconds
        setTimeout(() => {
            this.style.backgroundColor = '';
            this.style.color = '';
            this.innerHTML = '<p>Double-click me for a surprise!</p>';
            this.style.animation = '';
        }, 3000);
    });
    
    // ===== SECTION 2: INTERACTIVE ELEMENTS =====
    
    // Color Changing Button
    const colorButton = document.getElementById('color-button');
    const colors = ['#2575fc', '#6a11cb', '#fd7e14', '#20c997', '#e83e8c'];
    let colorIndex = 0;
    
    colorButton.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color #${colorIndex + 1}`;
    });
    
    // Image Gallery/Slideshow
    const images = [
        'https://source.unsplash.com/random/800x400?nature,1',
        'https://source.unsplash.com/random/800x400?nature,2',
        'https://source.unsplash.com/random/800x400?nature,3',
        'https://source.unsplash.com/random/800x400?nature,4'
    ];
    
    const currentImage = document.getElementById('current-image');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    let currentIndex = 0;
    
    // Function to update the displayed image
    function updateImage() {
        // Fade out effect
        currentImage.style.opacity = 0;
        
        setTimeout(() => {
            currentImage.src = images[currentIndex];
            // Update active thumbnail
            thumbnails.forEach((thumb, index) => {
                if (index === currentIndex) {
                    thumb.classList.add('active');
                } else {
                    thumb.classList.remove('active');
                }
            });
            
            // Fade in effect
            currentImage.style.opacity = 1;
        }, 300);
    }
    
    // Previous button click
    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    });
    
    // Next button click
    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    });
    
    // Thumbnail clicks
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            currentIndex = parseInt(this.getAttribute('data-index'));
            updateImage();
        });
    });
    
    // Add transition effect to the image
    currentImage.style.transition = 'opacity 0.3s ease';
    
    // Tabs functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding panel
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class on the content
            const content = this.nextElementSibling;
            const isActive = content.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.classList.remove('active');
            });
            
            document.querySelectorAll('.accordion-icon').forEach(icon => {
                icon.textContent = '+';
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                content.classList.add('active');
                this.querySelector('.accordion-icon').textContent = '-';
            }
        });
    });
    
    // ===== SECTION 3: FORM VALIDATION =====
    
    const validationForm = document.getElementById('validation-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    const formSuccess = document.getElementById('form-success');
    
    // Username validation
    usernameInput.addEventListener('input', function() {
        const usernameError = document.getElementById('username-error');
        
        if (this.value.length < 3) {
            usernameError.textContent = 'Username must be at least 3 characters long';
            this.classList.add('error');
        } else {
            usernameError.textContent = '';
            this.classList.remove('error');
        }
    });
    
    // Email validation
    emailInput.addEventListener('input', function() {
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(this.value)) {
            emailError.textContent = 'Please enter a valid email address';
            this.classList.add('error');
        } else {
            emailError.textContent = '';
            this.classList.remove('error');
        }
    });
    
    // Password strength checker
    passwordInput.addEventListener('input', function() {
        const passwordError = document.getElementById('password-error');
        const password = this.value;
        
        // Check password length
        if (password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters long';
            this.classList.add('error');
        } else {
            passwordError.textContent = '';
            this.classList.remove('error');
        }
        
        // Calculate password strength
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength += 25;
        
        // Contains lowercase
        if (/[a-z]/.test(password)) strength += 25;
        
        // Contains uppercase
        if (/[A-Z]/.test(password)) strength += 25;
        
        // Contains number or special character
        if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 25;
        
        // Update strength bar
        strengthBar.style.width = `${strength}%`;
        
        // Update color based on strength
        if (strength < 50) {
            strengthBar.style.backgroundColor = '#dc3545'; // Weak (red)
            strengthText.textContent = 'Weak password';
            strengthText.style.color = '#dc3545';
        } else if (strength < 75) {
            strengthBar.style.backgroundColor = '#ffc107'; // Medium (yellow)
            strengthText.textContent = 'Medium strength password';
            strengthText.style.color = '#ffc107';
        } else {
            strengthBar.style.backgroundColor = '#28a745'; // Strong (green)
            strengthText.textContent = 'Strong password';
            strengthText.style.color = '#28a745';
        }
    });
    
    // Confirm password validation
    confirmPasswordInput.addEventListener('input', function() {
        const confirmError = document.getElementById('confirm-password-error');
        
        if (this.value !== passwordInput.value) {
            confirmError.textContent = 'Passwords do not match';
            this.classList.add('error');
        } else {
            confirmError.textContent = '';
            this.classList.remove('error');
        }
    });
    
    // Form submission
    validationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Check if there are any errors
        const errors = document.querySelectorAll('.error-message');
        let hasErrors = false;
        
        errors.forEach(error => {
            if (error.textContent !== '') {
                hasErrors = true;
            }
        });
        
        // Check if all required fields are filled
        if (!usernameInput.value || !emailInput.value || !passwordInput.value || !confirmPasswordInput.value) {
            alert('Please fill in all required fields');
            return;
        }
        
        // If no errors and all fields filled, show success message
        if (!hasErrors) {
            formSuccess.classList.remove('hidden');
            
            // Reset form after 3 seconds
            setTimeout(() => {
                validationForm.reset();
                formSuccess.classList.add('hidden');
                strengthBar.style.width = '0';
                strengthText.textContent = 'Password strength';
                strengthText.style.color = '';
            }, 3000);
        }
    });
});
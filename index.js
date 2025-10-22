document.addEventListener('DOMContentLoaded', () => {
            // --- 1. Global State and DOM Elements ---
            const pages = {
                'profile': document.getElementById('page-profile'),
                'about': document.getElementById('page-about'),
                'contact': document.getElementById('page-contact')
            };
            const navButtons = document.querySelectorAll('.nav-button');
            const avatarImg = document.getElementById('avatar-image');
            
            // --- 2. Navigation and Routing Logic ---
            const showPage = (pageId) => {
                // Remove active class from all pages and buttons
                Object.values(pages).forEach(page => page.classList.remove('active'));
                navButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to the selected page and button
                pages[pageId].classList.add('active');
                document.querySelector(`[data-page="${pageId}"]`).classList.add('active');
                
                // Focus the main heading of the new page for screen readers
                const mainHeading = pages[pageId].querySelector('h1, h2, h3');
                if (mainHeading) {
                    mainHeading.setAttribute('tabindex', '-1');
                    mainHeading.focus();
                    mainHeading.removeAttribute('tabindex'); // Remove tabindex after focusing
                }
            };

            // Attach event listeners to navigation buttons
            navButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const pageId = e.target.getAttribute('data-page');
                    showPage(pageId);
                });
            });

            // Set initial page view
            showPage('profile');


            // --- 3. Profile Card: Real-time Milliseconds Update ---
            const timeElement = document.querySelector('[data-testid="test-user-time"]');
            if (timeElement) {
                const updateTime = () => {
                    const currentTime = Date.now();
                    timeElement.textContent = currentTime;
                    timeElement.setAttribute('datetime', currentTime);
                };
                updateTime();
                setInterval(updateTime, 100);
            }

            // --- 4. Profile Card: Image Upload Logic ---
            const fileInput = document.getElementById('file-upload');
            const urlInput = document.getElementById('url-input');
            const urlButton = document.getElementById('set-url-btn');

            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        avatarImg.src = event.target.result;
                    };
                    reader.readAsDataURL(file);
                    urlInput.value = ''; // Clear other input
                }
            });

            urlButton.addEventListener('click', () => {
                const url = urlInput.value.trim();
                if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
                    avatarImg.src = url;
                    fileInput.value = ''; // Clear other input
                } else {
                    console.error('Invalid URL provided. Please ensure it starts with http:// or https://');
                }
            });
            
            // --- 5. Contact Us Form Validation Logic ---
            const contactForm = document.getElementById('contact-form');
            const successMessage = document.getElementById('contact-success');
            
            const formElementsConfig = [
                { id: 'contact-name', name: 'name', minLength: 1, requiredMsg: 'Full name is required.' },
                { id: 'contact-email', name: 'email', minLength: 1, isEmail: true, requiredMsg: 'Email address is required.' },
                { id: 'contact-subject', name: 'subject', minLength: 1, requiredMsg: 'A subject is required.' },
                { id: 'contact-message', name: 'message', minLength: 10, requiredMsg: 'A message is required.', lengthMsg: 'Message must be at least 10 characters.' }
            ];

            const emailRegex = /^\S+@\S+\.\S+$/;

            /**
             * Validates a single form field based on configuration.
             */
            const validateField = (element, value) => {
                let error = '';
                const fieldConfig = formElementsConfig.find(f => f.id === element.id);
                const errorElement = document.getElementById(`error-${fieldConfig.name}`);
                const groupElement = document.getElementById(`group-${fieldConfig.name}`);
                const errorId = `error-${fieldConfig.name}`;

                // --- Reset Error State ---
                groupElement.classList.remove('error');
                errorElement.style.display = 'none';
                element.removeAttribute('aria-describedby');

                // --- Validation Checks ---
                if (!value.trim()) {
                    error = fieldConfig.requiredMsg;
                } 
                else if (fieldConfig.isEmail && !emailRegex.test(value.trim())) {
                    error = 'Please enter a valid email address (e.g., name@domain.com).';
                }
                else if (fieldConfig.minLength > 1 && value.length < fieldConfig.minLength) {
                    error = fieldConfig.lengthMsg || `Input must be at least ${fieldConfig.minLength} characters long.`;
                }

                if (error) {
                    groupElement.classList.add('error');
                    errorElement.textContent = error;
                    errorElement.style.display = 'block';
                    // --- Accessibility: Tie error message to input ---
                    element.setAttribute('aria-describedby', errorId);
                    return false;
                }
                return true;
            };
            
            // Expose reset function globally for the success button
            window.resetContactForm = () => {
                contactForm.style.display = 'grid';
                successMessage.style.display = 'none';
                contactForm.reset();
                // Clear any residual error styles
                contactForm.querySelectorAll('.form-group').forEach(el => el.classList.remove('error'));
                contactForm.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
            };

            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                let isFormValid = true;
                const invalidFields = [];

                formElementsConfig.forEach(field => {
                    const inputElement = document.getElementById(field.id);
                    const isValid = validateField(inputElement, inputElement.value);
                    
                    // Keep track of the first invalid field for focusing
                    if (!isValid && invalidFields.length === 0) {
                        invalidFields.push(inputElement);
                    }
                    // Use AND assignment to ensure one failure invalidates the whole form
                    isFormValid = isValid && isFormValid;
                });

                if (isFormValid) {
                    // Success: Hide form, show success message
                    contactForm.style.display = 'none';
                    successMessage.style.display = 'block';
                    console.log('Form Submitted Successfully:', Object.fromEntries(new FormData(contactForm)));
                } else {
                    // If invalid, focus on the first input with an error for accessibility
                    if (invalidFields.length > 0) {
                        invalidFields[0].focus();
                    }
                }
            });
        });
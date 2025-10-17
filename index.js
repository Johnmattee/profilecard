document.addEventListener('DOMContentLoaded', () => {
            const timeElement = document.querySelector('[data-testid="test-user-time"]');
            const avatarImg = document.getElementById('avatar-image');
            const fileInput = document.getElementById('file-upload');
            const urlInput = document.getElementById('url-input');
            const urlButton = document.getElementById('set-url-btn');

            // --- 1. Real-time Milliseconds Update ---
            if (timeElement) {
                const updateTime = () => {
                    const currentTime = Date.now();
                    timeElement.textContent = currentTime;
                    // Optionally update the datetime attribute for full semantic compliance
                    timeElement.setAttribute('datetime', currentTime);
                };

                // Update immediately on load
                updateTime();

                // Update every 100 milliseconds
                setInterval(updateTime, 100);
            }

            // --- 2. Image Upload Logic ---

            // Function to handle image file selection
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        // Set the avatar source to the Data URL of the uploaded file
                        avatarImg.src = event.target.result;
                    };
                    reader.readAsDataURL(file);
                    // Clear the URL input box
                    urlInput.value = '';
                }
            });

            // Function to handle URL input
            urlButton.addEventListener('click', () => {
                const url = urlInput.value.trim();
                // Simple validation for a non-empty, web-address-like string
                if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
                    // Set the avatar source directly to the URL
                    avatarImg.src = url;
                    // Clear the file input
                    fileInput.value = '';
                } else {
                    // Use console log or a less intrusive UI message instead of alert()
                    console.error('Invalid URL provided. Please ensure it starts with http:// or https://');
                }
            });
        });
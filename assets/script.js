function checkInternetConnection() {
    return navigator.onLine;
}

async function downloadApp(platform, button) {
    const allButtons = document.querySelectorAll('.download-button');
    const buttonText = button.querySelector('span');
    const originalText = buttonText.innerText;
    const retryButton = document.getElementById('retry-button');

    // Hide any visible retry button
    retryButton.classList.add('hidden');

    // Hide all other buttons and update the tapped button's text
    allButtons.forEach(btn => {
        if (btn !== button) {
            btn.classList.add('hidden');
        }
    });
    buttonText.innerText = `Downloading for ${platform}`;

    // Check internet connection before attempting download
    if (!checkInternetConnection()) {
        buttonText.innerText = 'No internet connection. Please check your connection.';
        // Show the retry button (already defined in HTML) below the active button
        retryButton.onclick = function() {
            retryButton.classList.add('hidden');
            downloadApp(platform, button);
        };
        retryButton.classList.remove('hidden');
        return;
    }

    try {
        // Based on platform, attempt to launch the URL
        if (platform === 'android') {
            // Android download URL
            const downloadUrl = '';
            window.location.href = downloadUrl;
            buttonText.innerText = 'Download it started, check your browser';
            console.log(`Download triggered for Android: ${downloadUrl}`);
        } else if (platform === 'ios') {
            buttonText.innerText = 'iOS version is not launched yet. Stay tuned!';
            console.log('iOS version is not launched yet.');
        } else if (platform === 'web') {
            // Redirect to web app URL
            const webUrl = 'https://messki.web.app/';
            window.location.href = webUrl;
            buttonText.innerText = 'Redirecting to the web app...';
            console.log(`Launching the web app: ${webUrl}`);
        } else {
            buttonText.innerText = 'Invalid platform selected.';
            console.error('Invalid platform specified.');
        }
    } catch (error) {
        console.error('Download failed:', error);
        buttonText.innerText = `Download failed: ${error.message}`;
    } finally {
        // Wait 7 seconds (4000ms) before restoring buttons for a new attempt.
        setTimeout(() => {
            allButtons.forEach(btn => btn.classList.remove('hidden'));
            buttonText.innerText = originalText;
            // Hide the retry button if it is still displayed
            retryButton.classList.add('hidden');
        }, 7000);
    }
}

function toggleInstructions() {
  const content = document.querySelector('.instructions-content');
  const arrow = document.querySelector('.instructions-header .arrow');
  content.classList.toggle('hidden');
  arrow.classList.toggle('rotate');
}

function changeLanguage(lang) {
  const languages = document.querySelectorAll('.language');
  const buttons = document.querySelectorAll('.language-selector button');

  languages.forEach(language => {
    language.classList.remove('active');
  });

  buttons.forEach(button => {
    button.classList.remove('active');
  });

  document.getElementById(lang).classList.add('active');
  document.querySelector(`.language-selector button[onclick="changeLanguage('${lang}')"]`).classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('[data-scroll="gallery"]');

    gallery.addEventListener('wheel', (event) => {
        event.preventDefault();
        gallery.scrollLeft += event.deltaY;
    });
});
function createMenuButton() {
    const menuButton = document.createElement('button');
    menuButton.id = 'universal-menu-button';
    menuButton.setAttribute('data-message', 'menu');

    const img = document.createElement('img');
    img.src = 'resources/menu.png'; // Update this path as needed
    img.alt = 'Menu';
    menuButton.appendChild(img);

    menuButton.style.position = 'fixed';
    menuButton.style.top = '10px';
    menuButton.style.left = '10px';
    menuButton.style.zIndex = '1002';
    menuButton.style.backgroundColor = 'transparent';
    menuButton.style.border = 'none';


    menuButton.addEventListener('click', togglePopup);

    return menuButton;
}

function createOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'universal-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '1000';
    overlay.style.display = 'none';

    return overlay;
}

function createPopup() {
    const popup = document.createElement('div');
    popup.id = 'universal-popup';
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.zIndex = '1001';
    popup.style.display = 'none'; // Hidden by default
    popup.style.backgroundColor = '#fff';
    popup.style.border = '1px solid black';
    popup.style.padding = '20px';
    popup.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    popup.style.width = '200px';
    popup.style.textAlign = 'center';

    // Quit Button
    const quitButton = document.createElement('button');
    quitButton.id = 'quit-button';
    quitButton.style.border='none';
    quitButton.style.backgroundColor = 'transparent';
    quitButton.setAttribute('data-message', 'quit');
    const quitImg = document.createElement('img');
    quitImg.src = 'resources/quit.png'; // Update this path as needed
    quitImg.alt = 'Quit';
    quitButton.appendChild(quitImg);
    popup.appendChild(quitButton);

    // Close Button
    const closeButton = document.createElement('button');
    closeButton.id = 'close-button';
    closeButton.setAttribute('data-message', 'close');
    closeButton.style.border='none';
    closeButton.style.backgroundColor = 'transparent';
    const closeImg = document.createElement('img');
    closeImg.src = 'resources/x.png'; // Update this path as needed
    closeImg.alt = 'Close';
    closeButton.appendChild(closeImg);
    closeButton.style.position = 'absolute';
    closeButton.style.top = '5px';
    closeButton.style.right = '5px';
    closeButton.addEventListener('click', togglePopup);
    popup.appendChild(closeButton);

    return popup;
}

function togglePopup() {
    const popup = document.getElementById('universal-popup');
    const overlay = document.getElementById('universal-overlay');
    const isHidden = popup.style.display === 'none';
    popup.style.display = isHidden ? 'block' : 'none';
    overlay.style.display = isHidden ? 'block' : 'none';
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const bodyElement = document.body;
    const menuButton = createMenuButton();
    const overlay = createOverlay();
    const popup = createPopup();

    bodyElement.appendChild(menuButton);
    bodyElement.appendChild(overlay);
    bodyElement.appendChild(popup);
});

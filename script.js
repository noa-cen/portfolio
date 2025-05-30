/* Navbar menu */
document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelectorAll('.navbar li');
    const sections = document.querySelectorAll('section[id]');
    const indicator = document.querySelector('.navbar .indicator');
    const navbar = document.querySelector('.navbar ul');
    const aboutMe = document.querySelector('#aboutme');

    function moveIndicator(activeMenuItem) {
        const rect = activeMenuItem.getBoundingClientRect();
        const parentRect = activeMenuItem.parentElement.getBoundingClientRect();
        indicator.style.width = `${rect.width}px`;
        indicator.style.transform = `translateX(${rect.left - parentRect.left}px)`;
    }

    function isInView(section) {
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom > 100;
    }

    // Managing clicks on menu items
    menu.forEach(item => {
        item.addEventListener('click', () => {
            document.querySelector('.navbar li.active')?.classList.remove('active');
            item.classList.add('active');
            moveIndicator(item);
        });
    });

    // ScrollSpy
    window.addEventListener('scroll', () => {
        let currentSectionId = null;

        // Find the visible section (at the top of the page)
        sections.forEach(section => {
            if (isInView(section)) {
                currentSectionId = section.id;
            }
        });

        // Updated the indicator and active menu
        if (currentSectionId) {
            const currentMenuItem = document.querySelector(`.navbar li a[href="#${currentSectionId}"]`)?.parentElement;
            if (currentMenuItem && !currentMenuItem.classList.contains('active')) {
                document.querySelector('.navbar li.active')?.classList.remove('active');
                currentMenuItem.classList.add('active');
                moveIndicator(currentMenuItem);
            }
        }

        // Color change synchronized with the #aboutme section
        if (aboutMe) {
            if (isInView(aboutMe)) {
                navbar.classList.remove('dark');
                navbar.classList.add('light');
            } else {
                navbar.classList.remove('light');
                navbar.classList.add('dark');
            }
        }
    });

    // Indicator initial position
    const initialActive = document.querySelector('.navbar li.active');
    if (initialActive) {
        initialActive.getBoundingClientRect();
        moveIndicator(initialActive);
    }
});

/* My projects */
const myProjectsContainer = document.querySelector('.myprojects');
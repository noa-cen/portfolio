/* Navbar menu */
document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelectorAll('.navbar li');
    const sections = document.querySelectorAll('section[id]');
    const indicator = document.querySelector('.navbar .indicator');
    const navbar = document.querySelector('.navbar ul');
    const aboutMe = document.querySelector('#aboutme');
    const myprojects = document.querySelector('#myprojects');

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
        if (aboutMe && myprojects) {
            if (isInView(aboutMe) || isInView(myprojects)) {
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
async function getProject() {
    try {
        const reponse = await fetch('assets/projects/projects.json');
        const projects = await reponse.json();
        return projects;
    }
    catch (error) {
        console.error('Error fetching or processing projects:', error);
    }
}

getProject().then(projects => {
    for (let i = 0; i < projects.length; i++) {
        const projectsContainer = document.querySelector('.myprojects');
        const myProject = document.createElement('article');
        myProject.classList.add('project');

        const project = projects[i];

        const titleElement = document.createElement('h4');
        titleElement.textContent = project.name;

        const cardImage = document.createElement('article');
        cardImage.classList.add('card');
        const imageElement = document.createElement('img');
        imageElement.classList.add('projectImage');
        imageElement.alt = `Image de l'écran d'accueil de ${project.name}`;
        imageElement.title = project.name;
        imageElement.src = project.image;
        cardImage.appendChild(imageElement);

        const technologiesList = document.createElement('ul');
        project.technologies.forEach(tech => {
            const technologieElement = document.createElement('li');
            technologieElement.classList.add('techElement')
            technologieElement.textContent = tech;
            technologiesList.appendChild(technologieElement);
        });

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = project.description;

        const linkElement = document.createElement('a');
        linkElement.classList.add('link');
        linkElement.href = project.link;
        linkElement.target = '_blank';
        linkElement.ariaLabel = `Accéder à la page ${project.name}`;
        linkElement.textContent = 'Voir la page';

        myProject.appendChild(titleElement);
        myProject.appendChild(cardImage);
        myProject.appendChild(technologiesList);
        myProject.appendChild(descriptionElement);
        myProject.appendChild(linkElement);
        projectsContainer.appendChild(myProject);
    }
});
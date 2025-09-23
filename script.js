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
        const projectsContainer = document.querySelector('.projects');
        const myProject = document.createElement('article');
        myProject.classList.add('project');

        const project = projects[i];

        const cardImage = document.createElement('article');
        cardImage.classList.add('card');
        const imageElement = document.createElement('img');
        imageElement.classList.add('projectImage');
        imageElement.alt = `Image de l'écran d'accueil de ${project.name}`;
        imageElement.title = project.name;
        imageElement.src = project.image;
        cardImage.appendChild(imageElement);

        imageElement.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(imageElement.src, project.name, project.intro, project.description, project.technologies, project.link);
        });

        const titleElement = document.createElement('h4');
        titleElement.classList.add('titleElement');
        titleElement.textContent = project.name;

        const introElement = document.createElement('p');
        introElement.classList.add('introElement');
        introElement.textContent = project.intro;

        myProject.appendChild(cardImage);
        myProject.appendChild(titleElement);
        myProject.appendChild(introElement);
        projectsContainer.appendChild(myProject);
    }
});

 // Modal functionality
function openModal(imageSrc, projectName, projectIntro, projectDescription, projectTechnologies, projectLink) {
    const modal = document.getElementById('projectModal');
    const modalImg = document.getElementById('modalImage');
    const modalLink = document.getElementById('modalLink');
    const modalTitle = document.getElementById('modalTitle');
    const modalIntro = document.getElementById('modalIntro');
    const modalDescription = document.getElementById('modalDescription');
    const modalTechnologies = document.getElementById('modalTechnologies');

    modal.style.display = 'flex';
    modalImg.src = imageSrc;
    modalLink.href = projectLink;
    modalTitle.textContent = `< ${projectName} />`;
    modalIntro.textContent = projectIntro;
    modalDescription.textContent = projectDescription;
    modalTechnologies.textContent = `Technologies utilisées: ${projectTechnologies}`;
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listeners for modal
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close');

    closeBtn.addEventListener('click', closeModal);

    // Click outside image to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});
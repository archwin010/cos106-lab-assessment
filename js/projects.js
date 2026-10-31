// ==========================================
// PROJECTS SHOWCASE MODULE (projects.js)
// ==========================================

function renderProjects() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;

    // Correct check for global AppState
    if (typeof AppState === 'undefined' || !AppState.projects) {
        projectsContainer.innerHTML = '<p class="empty-projects">Loading projects...</p>';
        return;
    }

    if (AppState.projects.length === 0) {
        projectsContainer.innerHTML = '<p class="empty-projects">No projects to display yet.</p>';
        return;
    }

    // Map through projects cleanly
    projectsContainer.innerHTML = AppState.projects.map(project => {
        const title = project.title || 'Project';
        const description = project.description || '';
        const link = project.link || '#';
        const imageUrl = project.imageURL || 'assets/images/g_store.png';

        return `
            <div class="project-card">
                <div class="project-image-wrapper">
                    <img src="${imageUrl}" alt="${title}" class="project-img">
                </div>
                <div class="project-info">
                    <h3>${title}</h3>
                    <p>${description}</p>
                    <a href="${link}" target="_blank" rel="noopener noreferrer" class="project-link">View Website</a>
                </div>
            </div>
        `;
    }).join('');
}

// Execute immediately
renderProjects();
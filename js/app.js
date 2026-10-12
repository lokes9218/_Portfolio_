/* ==========================================================================
   LOKESWARAN S - PORTFOLIO INTERACTIVITY ENGINE
   Accessible, Modular, High-Performance Vanilla JS
   ========================================================================== */

(function () {
  'use strict';

  // State
  const state = {
    theme: localStorage.getItem('theme') || 'dark',
    activeFilter: 'all',
    searchQuery: '',
    activeCaseStudyId: null,
    isCmdOpen: false,
    isResumeOpen: false
  };

  // DOM Elements Cache
  const elements = {
    html: document.documentElement,
    themeToggle: document.getElementById('theme-toggle'),
    featuredContainer: document.getElementById('featured-projects-container'),
    explorerContainer: document.getElementById('explorer-projects-container'),
    filterButtons: document.querySelectorAll('.filter-btn'),
    projectSearch: document.getElementById('project-search'),
    projectCount: document.getElementById('project-count'),
    patentsContainer: document.getElementById('patents-container'),
    publicationsContainer: document.getElementById('publications-container'),
    skillsContainer: document.getElementById('skills-container'),
    timelineContainer: document.getElementById('timeline-container'),
    caseStudyModal: document.getElementById('case-study-modal'),
    caseStudyModalBackdrop: document.getElementById('case-study-backdrop'),
    caseStudyContent: document.getElementById('case-study-content'),
    closeCaseStudyBtn: document.getElementById('close-case-study-btn'),
    resumeModalBackdrop: document.getElementById('resume-backdrop'),
    viewResumeBtn: document.getElementById('view-resume-btn'),
    closeResumeBtn: document.getElementById('close-resume-btn'),
    printResumeBtn: document.getElementById('print-resume-btn'),
    cmdBtn: document.getElementById('cmd-k-trigger'),
    cmdBackdrop: document.getElementById('cmd-backdrop'),
    cmdInput: document.getElementById('cmd-input'),
    cmdResults: document.getElementById('cmd-results'),
    closeCmdBtn: document.getElementById('close-cmd-btn'),
    contactForm: document.getElementById('contact-form'),
    formStatus: document.getElementById('form-status'),
    copyEmailBtns: document.querySelectorAll('.js-copy-email'),
    toastContainer: document.getElementById('toast-container')
  };

  /* --------------------------------------------------------------------------
     1. THEME MANAGEMENT
     -------------------------------------------------------------------------- */
  function applyTheme(theme) {
    state.theme = theme;
    elements.html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (elements.themeToggle) {
      elements.themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      elements.themeToggle.innerHTML = theme === 'dark' 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    }
  }

  function initTheme() {
    applyTheme(state.theme);
    if (elements.themeToggle) {
      elements.themeToggle.addEventListener('click', () => {
        applyTheme(state.theme === 'dark' ? 'light' : 'dark');
        showToast(`Switched to ${state.theme} mode`);
      });
    }
  }

  /* --------------------------------------------------------------------------
     2. TOAST NOTIFICATIONS
     -------------------------------------------------------------------------- */
  function showToast(message) {
    if (!elements.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${escapeHTML(message)}</span>
    `;
    elements.toastContainer.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  /* --------------------------------------------------------------------------
     3. COPY EMAIL INTERACTION
     -------------------------------------------------------------------------- */
  function initCopyEmail() {
    elements.copyEmailBtns.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = PORTFOLIO_DATA.profile.contacts.email;
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(email);
          } else {
            const temp = document.createElement('textarea');
            temp.value = email;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand('copy');
            document.body.removeChild(temp);
          }
          showToast(`Copied email to clipboard: ${email}`);
        } catch (err) {
          showToast(`Email: ${email}`);
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. RENDER FEATURED PROJECTS
     -------------------------------------------------------------------------- */
  function renderFeaturedProjects() {
    if (!elements.featuredContainer) return;
    const featured = PORTFOLIO_DATA.projects.filter(p => p.featured);
    
    elements.featuredContainer.innerHTML = featured.map(p => `
      <article class="project-card" data-project-id="${p.id}">
        <div>
          <div class="project-card-header">
            <div class="project-card-meta">
              <span class="project-badge">${escapeHTML(p.categoryLabel)}</span>
              ${p.stats ? `<span class="project-stat-pill">${escapeHTML(p.stats)}</span>` : ''}
            </div>
            <h3 class="project-card-title">${escapeHTML(p.title)}</h3>
            <p class="project-card-subtitle">${escapeHTML(p.subtitle)}</p>
          </div>
          <p class="project-card-desc">${escapeHTML(p.summary)}</p>
          <div class="tech-tag-group">
            ${p.tech.map(t => `<span class="tech-tag">${escapeHTML(t)}</span>`).join('')}
          </div>
        </div>
        <div class="project-card-footer">
          <button class="card-action-btn js-open-case-study" data-project-id="${p.id}">
            <span>Inspect Case Study</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
          ${p.github ? `
            <a href="${p.github}" target="_blank" rel="noreferrer" class="card-repo-link" aria-label="GitHub repository for ${escapeHTML(p.title)}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              <span>GitHub</span>
            </a>
          ` : ''}
        </div>
      </article>
    `).join('');
  }

  /* --------------------------------------------------------------------------
     5. RENDER PROJECT EXPLORER (FILTER & SEARCH)
     -------------------------------------------------------------------------- */
  function filterProjects() {
    const query = state.searchQuery.toLowerCase().trim();
    const filter = state.activeFilter;

    return PORTFOLIO_DATA.projects.filter(p => {
      const matchesFilter = filter === 'all' || p.category === filter;
      const matchesQuery = !query || 
        p.title.toLowerCase().includes(query) ||
        p.subtitle.toLowerCase().includes(query) ||
        p.summary.toLowerCase().includes(query) ||
        p.tech.some(t => t.toLowerCase().includes(query));
      return matchesFilter && matchesQuery;
    });
  }

  function renderExplorerProjects() {
    if (!elements.explorerContainer) return;
    const filtered = filterProjects();

    if (elements.projectCount) {
      elements.projectCount.textContent = `Showing ${filtered.length} of ${PORTFOLIO_DATA.projects.length} engineering projects`;
    }

    if (filtered.length === 0) {
      elements.explorerContainer.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 3rem 1rem; text-align: center; color: var(--text-muted); font-family: var(--font-mono); background: var(--surface); border: 1px dashed var(--border); border-radius: var(--radius-md);">
          <p>No projects match your current filter query.</p>
          <button id="reset-filters-btn" style="margin-top: 0.75rem; color: var(--accent); text-decoration: underline; cursor: pointer;">Reset all filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-filters-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          state.activeFilter = 'all';
          state.searchQuery = '';
          if (elements.projectSearch) elements.projectSearch.value = '';
          elements.filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === 'all'));
          renderExplorerProjects();
        });
      }
      return;
    }

    elements.explorerContainer.innerHTML = filtered.map(p => `
      <article class="project-card" data-project-id="${p.id}">
        <div>
          <div class="project-card-header">
            <div class="project-card-meta">
              <span class="project-badge">${escapeHTML(p.categoryLabel)}</span>
              ${p.stats ? `<span class="project-stat-pill">${escapeHTML(p.stats)}</span>` : ''}
            </div>
            <h3 class="project-card-title">${escapeHTML(p.title)}</h3>
            <p class="project-card-subtitle">${escapeHTML(p.subtitle)}</p>
          </div>
          <p class="project-card-desc">${escapeHTML(p.summary)}</p>
          <div class="tech-tag-group">
            ${p.tech.map(t => `<span class="tech-tag">${escapeHTML(t)}</span>`).join('')}
          </div>
        </div>
        <div class="project-card-footer">
          <button class="card-action-btn js-open-case-study" data-project-id="${p.id}">
            <span>Inspect Case Study</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
          ${p.github ? `
            <a href="${p.github}" target="_blank" rel="noreferrer" class="card-repo-link" aria-label="GitHub repository for ${escapeHTML(p.title)}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              <span>GitHub</span>
            </a>
          ` : ''}
        </div>
      </article>
    `).join('');
  }

  function initExplorerInteractions() {
    elements.filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        elements.filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeFilter = btn.dataset.filter || 'all';
        renderExplorerProjects();
      });
    });

    if (elements.projectSearch) {
      elements.projectSearch.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderExplorerProjects();
      });
    }
  }

  /* --------------------------------------------------------------------------
     6. CASE STUDY MODAL / DRAWER
     -------------------------------------------------------------------------- */
  function openCaseStudy(projectId) {
    const project = PORTFOLIO_DATA.projects.find(p => p.id === projectId);
    if (!project || !elements.caseStudyModalBackdrop) return;

    state.activeCaseStudyId = projectId;
    const cs = project.caseStudy;

    elements.caseStudyContent.innerHTML = `
      <div style="margin-bottom: 1.5rem; padding-bottom: 1.25rem; border-bottom: 1px solid var(--border);">
        <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
          <span class="project-badge">${escapeHTML(project.categoryLabel)}</span>
          ${project.stats ? `<span class="project-stat-pill">${escapeHTML(project.stats)}</span>` : ''}
        </div>
        <h2 style="font-size: 1.75rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem;">${escapeHTML(project.title)}</h2>
        <p style="font-size: 0.95rem; color: var(--accent); margin-bottom: 1rem;">${escapeHTML(project.subtitle)}</p>
        <div class="tech-tag-group" style="margin-bottom: 0;">
          ${project.tech.map(t => `<span class="tech-tag">${escapeHTML(t)}</span>`).join('')}
        </div>
      </div>

      <div class="case-study-section">
        <h3 class="case-study-h3">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          Problem Statement & Context
        </h3>
        <p class="case-study-p">${escapeHTML(cs.problem)}</p>
      </div>

      <div class="case-study-section">
        <h3 class="case-study-h3">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          Individual Contribution
        </h3>
        <p class="case-study-p">${escapeHTML(cs.contribution)}</p>
      </div>

      <div class="case-study-section">
        <h3 class="case-study-h3">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
          Architecture & System Design
        </h3>
        <ul class="case-study-list">
          ${cs.architecture.map(item => `<li>${escapeHTML(item)}</li>`).join('')}
        </ul>
      </div>

      <div class="case-study-section">
        <h3 class="case-study-h3">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
          Key Engineering Challenges Solved
        </h3>
        ${cs.challenges.map(ch => `
          <div class="challenge-box">
            <h4 class="challenge-title">${escapeHTML(ch.title)}</h4>
            <p class="case-study-p" style="font-size: 0.85rem;">${escapeHTML(ch.solution)}</p>
          </div>
        `).join('')}
      </div>

      <div class="case-study-section">
        <h3 class="case-study-h3">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          Verified Results & Outcomes
        </h3>
        <ul class="case-study-list">
          ${cs.results.map(r => `<li><strong>${escapeHTML(r)}</strong></li>`).join('')}
        </ul>
      </div>

      <div class="case-study-section">
        <h3 class="case-study-h3">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
          Future Improvements
        </h3>
        <p class="case-study-p">${escapeHTML(cs.nextSteps)}</p>
      </div>

      ${project.github ? `
        <div style="padding-top: 1.25rem; border-top: 1px solid var(--border); display: flex; gap: 1rem;">
          <a href="${project.github}" target="_blank" rel="noreferrer" class="btn btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            <span>View Source on GitHub</span>
          </a>
        </div>
      ` : ''}
    `;

    elements.caseStudyModalBackdrop.classList.add('open');
    elements.caseStudyModalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCaseStudy() {
    if (!elements.caseStudyModalBackdrop) return;
    elements.caseStudyModalBackdrop.classList.remove('open');
    elements.caseStudyModalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    state.activeCaseStudyId = null;
  }

  function initCaseStudyModal() {
    document.addEventListener('click', (e) => {
      const target = e.target.closest('.js-open-case-study');
      if (target) {
        e.preventDefault();
        openCaseStudy(target.dataset.projectId);
      }
    });

    if (elements.closeCaseStudyBtn) {
      elements.closeCaseStudyBtn.addEventListener('click', closeCaseStudy);
    }

    if (elements.caseStudyModalBackdrop) {
      elements.caseStudyModalBackdrop.addEventListener('click', (e) => {
        if (e.target === elements.caseStudyModalBackdrop) closeCaseStudy();
      });
    }
  }

  /* --------------------------------------------------------------------------
     7. RENDER PATENTS & PUBLICATIONS
     -------------------------------------------------------------------------- */
  function renderPatentsAndPublications() {
    if (elements.patentsContainer) {
      elements.patentsContainer.innerHTML = PORTFOLIO_DATA.patents.map(pat => `
        <article class="patent-card" data-patent-id="${pat.id}">
          <div class="patent-meta-row">
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <span class="patent-app-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Patent App No: ${escapeHTML(pat.appNo)}
              </span>
              <span class="project-stat-pill">${escapeHTML(pat.status)} (${escapeHTML(pat.year)})</span>
            </div>
            <span class="patent-authority">${escapeHTML(pat.authority)}</span>
          </div>
          <h3 class="patent-title">${escapeHTML(pat.title)}</h3>
          <p class="patent-inventors"><strong>Patentees:</strong> ${escapeHTML(pat.inventors)}</p>
          <p class="patent-abstract">${escapeHTML(pat.abstract)}</p>
          <span class="patent-domain-tag">${escapeHTML(pat.domain)}</span>
        </article>
      `).join('');
    }

    if (elements.publicationsContainer) {
      elements.publicationsContainer.innerHTML = PORTFOLIO_DATA.publications.map(pub => `
        <article class="patent-card" data-pub-id="${pub.id}">
          <div class="patent-meta-row">
            <span class="project-badge">${escapeHTML(pub.type)} • ${escapeHTML(pub.status)}</span>
            <span class="patent-authority">${escapeHTML(pub.year)}</span>
          </div>
          <h3 class="patent-title">${escapeHTML(pub.title)}</h3>
          <p class="patent-inventors"><strong>Authors:</strong> ${escapeHTML(pub.authors)} — <em>${escapeHTML(pub.venue)}</em></p>
          <p class="patent-abstract">${escapeHTML(pub.focus)}</p>
        </article>
      `).join('');
    }
  }

  /* --------------------------------------------------------------------------
     8. RENDER SKILLS
     -------------------------------------------------------------------------- */
  function renderSkills() {
    if (!elements.skillsContainer) return;
    elements.skillsContainer.innerHTML = PORTFOLIO_DATA.skills.map(cat => `
      <div class="skill-category-card">
        <h3 class="skill-category-title">${escapeHTML(cat.category)}</h3>
        <ul class="skill-items-list">
          ${cat.items.map(item => `
            <li class="skill-item">
              <div class="skill-item-header">
                <span class="skill-name">${escapeHTML(item.name)}</span>
                <span class="skill-level-badge">${escapeHTML(item.level)}</span>
              </div>
              <p class="skill-desc">${escapeHTML(item.desc)}</p>
            </li>
          `).join('')}
        </ul>
      </div>
    `).join('');
  }

  /* --------------------------------------------------------------------------
     9. RENDER TIMELINE (EXPERIENCE & LEADERSHIP)
     -------------------------------------------------------------------------- */
  function renderTimeline() {
    if (!elements.timelineContainer) return;
    elements.timelineContainer.innerHTML = PORTFOLIO_DATA.experience.map(exp => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-header">
          <h3 class="timeline-role">${escapeHTML(exp.role)}</h3>
          <span class="timeline-period">${escapeHTML(exp.period)} • ${escapeHTML(exp.location)}</span>
        </div>
        <div class="timeline-org">${escapeHTML(exp.org)}</div>
        <ul class="timeline-points">
          ${exp.points.map(pt => `<li>${escapeHTML(pt)}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  /* --------------------------------------------------------------------------
     10. RESUME MODAL & PRINT VIEW
     -------------------------------------------------------------------------- */
  function initResumeModal() {
    if (elements.viewResumeBtn) {
      elements.viewResumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openResumeModal();
      });
    }

    if (elements.closeResumeBtn) {
      elements.closeResumeBtn.addEventListener('click', closeResumeModal);
    }

    if (elements.resumeModalBackdrop) {
      elements.resumeModalBackdrop.addEventListener('click', (e) => {
        if (e.target === elements.resumeModalBackdrop) closeResumeModal();
      });
    }

    if (elements.printResumeBtn) {
      elements.printResumeBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }

  function openResumeModal() {
    if (!elements.resumeModalBackdrop) return;
    elements.resumeModalBackdrop.classList.add('open');
    elements.resumeModalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    state.isResumeOpen = true;
  }

  function closeResumeModal() {
    if (!elements.resumeModalBackdrop) return;
    elements.resumeModalBackdrop.classList.remove('open');
    elements.resumeModalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    state.isResumeOpen = false;
  }

  /* --------------------------------------------------------------------------
     11. COMMAND PALETTE (CTRL/CMD + K)
     -------------------------------------------------------------------------- */
  const commandItems = [
    // Sections
    { title: "Featured Work", section: "#featured", category: "Section" },
    { title: "Project Explorer", section: "#projects", category: "Section" },
    { title: "Patents & Research", section: "#patents", category: "Section" },
    { title: "Technical Skills", section: "#skills", category: "Section" },
    { title: "Experience & Education", section: "#experience", category: "Section" },
    { title: "Contact", section: "#contact", category: "Section" },
    // Actions
    { title: "View Formatted Resume", action: "resume", category: "Action" },
    { title: "Toggle Light / Dark Theme", action: "theme", category: "Action" },
    { title: "Copy Email Address", action: "copy-email", category: "Action" },
    // Projects
    ...PORTFOLIO_DATA.projects.map(p => ({
      title: `Project: ${p.title}`,
      caseStudyId: p.id,
      category: "Case Study"
    })),
    // Patents
    ...PORTFOLIO_DATA.patents.map(pat => ({
      title: `Patent: ${pat.title}`,
      section: "#patents",
      category: "Patent"
    })),
    // External
    { title: "GitHub Profile (@lokes9218)", url: PORTFOLIO_DATA.profile.contacts.github, category: "External" },
    { title: "LinkedIn Profile", url: PORTFOLIO_DATA.profile.contacts.linkedin, category: "External" },
    { title: "LeetCode Profile (400+ Solved)", url: PORTFOLIO_DATA.profile.contacts.leetcode, category: "External" }
  ];

  function openCmdPalette() {
    if (!elements.cmdBackdrop) return;
    elements.cmdBackdrop.classList.add('open');
    elements.cmdBackdrop.setAttribute('aria-hidden', 'false');
    state.isCmdOpen = true;
    if (elements.cmdInput) {
      elements.cmdInput.value = '';
      setTimeout(() => elements.cmdInput.focus(), 50);
    }
    renderCmdResults('');
  }

  function closeCmdPalette() {
    if (!elements.cmdBackdrop) return;
    elements.cmdBackdrop.classList.remove('open');
    elements.cmdBackdrop.setAttribute('aria-hidden', 'true');
    state.isCmdOpen = false;
  }

  function renderCmdResults(query) {
    if (!elements.cmdResults) return;
    const q = query.toLowerCase().trim();
    const filtered = commandItems.filter(item => 
      !q || item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    );

    if (filtered.length === 0) {
      elements.cmdResults.innerHTML = `
        <li style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
          No matching commands found.
        </li>
      `;
      return;
    }

    elements.cmdResults.innerHTML = filtered.map((item, idx) => `
      <li class="cmd-result-item ${idx === 0 ? 'selected' : ''}" data-idx="${idx}">
        <span>${escapeHTML(item.title)}</span>
        <span class="cmd-result-meta">${escapeHTML(item.category)}</span>
      </li>
    `).join('');

    // Attach click events
    elements.cmdResults.querySelectorAll('.cmd-result-item').forEach((li, idx) => {
      li.addEventListener('click', () => executeCmdItem(filtered[idx]));
    });
  }

  function executeCmdItem(item) {
    closeCmdPalette();
    if (!item) return;

    if (item.section) {
      const el = document.querySelector(item.section);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (item.caseStudyId) {
      openCaseStudy(item.caseStudyId);
    } else if (item.action === 'resume') {
      openResumeModal();
    } else if (item.action === 'theme') {
      applyTheme(state.theme === 'dark' ? 'light' : 'dark');
      showToast(`Switched to ${state.theme} mode`);
    } else if (item.action === 'copy-email') {
      navigator.clipboard.writeText(PORTFOLIO_DATA.profile.contacts.email);
      showToast(`Copied email: ${PORTFOLIO_DATA.profile.contacts.email}`);
    } else if (item.url) {
      window.open(item.url, '_blank');
    }
  }

  function initCmdPalette() {
    if (elements.cmdBtn) {
      elements.cmdBtn.addEventListener('click', openCmdPalette);
    }

    if (elements.closeCmdBtn) {
      elements.closeCmdBtn.addEventListener('click', closeCmdPalette);
    }

    if (elements.cmdBackdrop) {
      elements.cmdBackdrop.addEventListener('click', (e) => {
        if (e.target === elements.cmdBackdrop) closeCmdPalette();
      });
    }

    if (elements.cmdInput) {
      elements.cmdInput.addEventListener('input', (e) => {
        renderCmdResults(e.target.value);
      });

      elements.cmdInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const selected = elements.cmdResults.querySelector('.cmd-result-item.selected') || elements.cmdResults.querySelector('.cmd-result-item');
          if (selected) {
            selected.click();
          }
        }
      });
    }

    // Global keyboard listener
    window.addEventListener('keydown', (e) => {
      // Toggle Ctrl+K / Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        state.isCmdOpen ? closeCmdPalette() : openCmdPalette();
      }

      // Escape key closes modals
      if (e.key === 'Escape') {
        if (state.isCmdOpen) closeCmdPalette();
        if (state.activeCaseStudyId) closeCaseStudy();
        if (state.isResumeOpen) closeResumeModal();
      }
    });
  }

  /* --------------------------------------------------------------------------
     12. CONTACT FORM SUBMISSION
     -------------------------------------------------------------------------- */
  function initContactForm() {
    if (!elements.contactForm) return;

    elements.contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('sender-name');
      const emailInput = document.getElementById('sender-email');
      const messageInput = document.getElementById('sender-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        if (elements.formStatus) {
          elements.formStatus.textContent = 'Please fill out all fields before submitting.';
          elements.formStatus.style.color = '#ef4444';
        }
        return;
      }

      // Construct verified mailto link as direct fallback
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailtoUrl = `mailto:${PORTFOLIO_DATA.profile.contacts.email}?subject=${subject}&body=${body}`;

      window.location.href = mailtoUrl;

      if (elements.formStatus) {
        elements.formStatus.textContent = 'Opening your email client to send message...';
        elements.formStatus.style.color = '#10b981';
      }

      showToast('Opening default email client...');
      elements.contactForm.reset();
    });
  }

  /* --------------------------------------------------------------------------
     13. INITIALIZATION
     -------------------------------------------------------------------------- */
  function init() {
    initTheme();
    renderFeaturedProjects();
    renderExplorerProjects();
    initExplorerInteractions();
    initCaseStudyModal();
    renderPatentsAndPublications();
    renderSkills();
    renderTimeline();
    initResumeModal();
    initCmdPalette();
    initCopyEmail();
    initContactForm();

    console.log("Lokeswaran S Portfolio initialized successfully.");
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

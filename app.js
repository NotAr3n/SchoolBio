document.addEventListener('DOMContentLoaded', () => {
    // State & Storage
    let state = {
        currentView: 'home',
        completedTopics: JSON.parse(localStorage.getItem('biostudy_completed')) || [],
        quizScores: JSON.parse(localStorage.getItem('biostudy_scores')) || {},
        knownCards: JSON.parse(localStorage.getItem('biostudy_known')) || [],
        currentFlashcardIndex: 0,
        flashcardsShuffled: [...STUDY_CONTENT.flashcards],
        activeQuiz: null,
        currentQuestionIndex: 0,
        quizAnswers: {},
        quizSubmitted: false
    };

    function saveState() {
        localStorage.setItem('biostudy_completed', JSON.stringify(state.completedTopics));
        localStorage.setItem('biostudy_scores', JSON.stringify(state.quizScores));
        localStorage.setItem('biostudy_known', JSON.stringify(state.knownCards));
    }

    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlTag = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');

    const savedTheme = localStorage.getItem('biostudy_theme') || 'light';
    htmlTag.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlTag.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlTag.setAttribute('data-theme', newTheme);
        localStorage.setItem('biostudy_theme', newTheme);
        updateThemeUI(newTheme);
    });

    function updateThemeUI(theme) {
        if (theme === 'dark') {
            themeIcon.setAttribute('data-icon', 'sun');
            themeText.textContent = 'Light Mode';
        } else {
            themeIcon.setAttribute('data-icon', 'moon');
            themeText.textContent = 'Dark Mode';
        }
        lucide.createIcons();
    }

    // Navigation
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentView = btn.getAttribute('data-view');
            renderView();
        });
    });

    // Render Views
    function renderView() {
        const container = document.getElementById('view-container');
        const titleEl = document.getElementById('view-title');
        container.innerHTML = '';

        switch(state.currentView) {
            case 'home':
                titleEl.textContent = 'Dashboard';
                container.innerHTML = renderDashboard();
                attachDashboardListeners();
                break;
            case 'notes':
                titleEl.textContent = 'Study Notes';
                container.innerHTML = renderNotes();
                break;
            case 'quizzes':
                titleEl.textContent = state.activeQuiz ? state.activeQuiz.title : 'Chapter Quizzes';
                container.innerHTML = state.activeQuiz ? renderActiveQuiz() : renderQuizList();
                attachQuizListeners();
                break;
            case 'flashcards':
                titleEl.textContent = 'Interactive Flashcards';
                container.innerHTML = renderFlashcards();
                attachFlashcardListeners();
                break;
            case 'progress':
                titleEl.textContent = 'My Study Progress';
                container.innerHTML = renderProgress();
                attachProgressListeners();
                break;
        }
        lucide.createIcons();
    }

    // 1. Dashboard View
    function renderDashboard() {
        const totalChapters = STUDY_CONTENT.chapters.length;
        const completedCount = state.completedTopics.length;
        const progressPercent = Math.round((completedCount / totalChapters) * 100) || 0;

        return `
            <div class="dashboard-grid">
                <div class="stat-card">
                    <h3>Overall Progress</h3>
                    <div class="value">${progressPercent}%</div>
                    <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.5rem;">${completedCount} of ${totalChapters} chapters completed</p>
                </div>
                <div class="stat-card">
                    <h3>Total Quizzes Taken</h3>
                    <div class="value">${Object.keys(state.quizScores).length}</div>
                    <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.5rem;">Test your knowledge in Quizzes</p>
                </div>
                <div class="stat-card">
                    <h3>Mastered Flashcards</h3>
                    <div class="value">${state.knownCards.length} / ${STUDY_CONTENT.flashcards.length}</div>
                    <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.5rem;">Marked as known</p>
                </div>
            </div>

            <div class="chapters-list-section">
                <h2>Textbook Chapters</h2>
                <div class="chapter-cards">
                    ${STUDY_CONTENT.chapters.map(ch => `
                        <div class="chapter-card">
                            <div>
                                <h3>${ch.title}</h3>
                                <p>${ch.description}</p>
                            </div>
                            <div class="card-actions" style="margin-top: 1rem;">
                                <button class="btn view-notes-btn" data-id="${ch.id}"><i data-lucide="book-open"></i> Read Notes</button>
                                <button class="btn btn-secondary start-quiz-btn" data-id="${ch.id}"><i data-lucide="help-circle"></i> Quiz</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    function attachDashboardListeners() {
        document.querySelectorAll('.view-notes-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                state.currentView = 'notes';
                document.querySelector('[data-view="notes"]').click();
            });
        });
        document.querySelectorAll('.start-quiz-btn').forEach(btn => {
            const chId = parseInt(btn.getAttribute('data-id'));
            btn.addEventListener('click', () => {
                startQuiz(chId);
            });
        });
    }

    // 2. Notes View
    function renderNotes() {
        return `
            <div class="notes-container">
                ${STUDY_CONTENT.chapters.map(ch => {
                    const isCompleted = state.completedTopics.includes(ch.id);
                    return `
                        <div class="note-box">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                                <h2>${ch.title}</h2>
                                <button class="btn ${isCompleted ? 'btn-secondary' : ''} toggle-complete" data-id="${ch.id}">
                                    <i data-lucide="${isCompleted ? 'check-circle-2' : 'circle'}"></i> ${isCompleted ? 'Completed' : 'Mark as Complete'}
                                </button>
                            </div>
                            ${ch.notes.map(n => `
                                <h3>${n.heading}</h3>
                                <p>${n.content}</p>
                                ${n.definitions ? n.definitions.map(d => `<div class="definition-tag">${d}</div>`).join('') : ''}
                                ${n.facts ? `<ul>${n.facts.map(f => `<li>${f}</li>`).join('')}</ul>` : ''}
                            `).join('')}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    // Attach listener for notes completion
    document.addEventListener('click', (e) => {
        if (e.target.closest('.toggle-complete')) {
            const btn = e.target.closest('.toggle-complete');
            const chId = parseInt(btn.getAttribute('data-id'));
            if (state.completedTopics.includes(chId)) {
                state.completedTopics = state.completedTopics.filter(id => id !== chId);
            } else {
                state.completedTopics.push(chId);
            }
            saveState();
            renderView();
        }
    });

    // 3. Quiz View
    function renderQuizList() {
        return `
            <div class="chapters-list-section">
                <h2>Select a Chapter Quiz</h2>
                <div class="chapter-cards" style="margin-top: 1.5rem;">
                    ${STUDY_CONTENT.quizzes.map(q => `
                        <div class="chapter-card">
                            <div>
                                <h3>${q.title}</h3>
                                <p>${q.questions.length} questions based on textbook content.</p>${state.quizScores[q.id] !== undefined ? `<p style="color: var(--success); font-weight: 600; margin-top: 0.5rem;">Last Score: ${state.quizScores[q.id]}%</p>` : ''}
                            </div>
                            <div style="margin-top: 1rem;">
                                <button class="btn start-quiz-from-list" data-id="${q.id}"><i data-lucide="play"></i> Start Quiz</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    function startQuiz(quizId) {
        state.activeQuiz = STUDY_CONTENT.quizzes.find(q => q.id === quizId);
        state.currentQuestionIndex = 0;
        state.quizAnswers = {};
        state.quizSubmitted = false;
        state.currentView = 'quizzes';
        renderView();
    }

    function renderActiveQuiz() {
        const quiz = state.activeQuiz;
        const q = quiz.questions[state.currentQuestionIndex];
        const selectedOption = state.quizAnswers[state.currentQuestionIndex];

        return `
            <div class="quiz-container">
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; color: var(--text-muted); font-size: 0.9rem;">
                    <span>Question ${state.currentQuestionIndex + 1} of ${quiz.questions.length}</span>
                    <button class="btn btn-secondary" id="back-to-quiz-list">Back to Quizzes</button>
                </div>
                <div class="quiz-question">${q.q}</div>
                <div class="quiz-options">
                    ${q.options.map((opt, idx) => {
                        let optClass = '';
                        if (state.quizSubmitted) {
                            if (idx === q.answer) optClass = 'correct';
                            else if (selectedOption === idx) optClass = 'incorrect';
                        } else if (selectedOption === idx) {
                            optClass = 'selected';
                        }
                        return `<div class="quiz-option ${optClass}" data-index="${idx}">${opt}</div>`;
                    }).join('')}
                </div>
                ${state.quizSubmitted ? `
                    <div class="explanation-box">
                        <strong>Explanation:</strong> ${q.explanation}
                    </div>
                ` : ''}
                <div style="display: flex; justify-content: space-between; margin-top: 1.5rem;">
                    <button class="btn btn-secondary" id="prev-q" ${state.currentQuestionIndex === 0 ? 'disabled style="opacity: 0.5;"' : ''}>Previous</button>
                    ${!state.quizSubmitted ? `
                        <button class="btn" id="submit-q" ${selectedOption === undefined ? 'disabled style="opacity: 0.5;"' : ''}>Submit Answer</button>
                    ` : `
                        <button class="btn" id="next-q">${state.currentQuestionIndex === quiz.questions.length - 1 ? 'View Results' : 'Next Question'}</button>
                    `}
                </div>
            </div>
        `;
    }

    function attachQuizListeners() {
        const backBtn = document.getElementById('back-to-quiz-list');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                state.activeQuiz = null;
                renderView();
            });
        }

        document.querySelectorAll('.start-quiz-from-list').forEach(btn => {
            btn.addEventListener('click', () => {
                startQuiz(parseInt(btn.getAttribute('data-id')));
            });
        });

        document.querySelectorAll('.quiz-option').forEach(opt => {
            opt.addEventListener('click', () => {
                if (state.quizSubmitted) return;
                const idx = parseInt(opt.getAttribute('data-index'));
                state.quizAnswers[state.currentQuestionIndex] = idx;
                renderView();
            });
        });

        const submitBtn = document.getElementById('submit-q');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                state.quizSubmitted = true;
                renderView();
            });
        }

        const nextBtn = document.getElementById('next-q');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (state.currentQuestionIndex < state.activeQuiz.questions.length - 1) {
                    state.currentQuestionIndex++;
                    state.quizSubmitted = state.quizAnswers[state.currentQuestionIndex] !== undefined;
                    renderView();
                } else {
                    // Calculate score
                    let correctCount = 0;
                    state.activeQuiz.questions.forEach((q, i) => {
                        if (state.quizAnswers[i] === q.answer) correctCount++;
                    });
                    const scorePercent = Math.round((correctCount / state.activeQuiz.questions.length) * 100);
                    state.quizScores[state.activeQuiz.id] = scorePercent;
                    saveState();

                    const container = document.getElementById('view-container');
                    container.innerHTML = `
                        <div class="quiz-container" style="text-align: center;">
                            <h2>Quiz Complete! 🎉</h2>
                            <div style="font-size: 3rem; font-weight: 700; color: var(--primary); margin: 1rem 0;">${scorePercent}%</div>
                            <p style="color: var(--text-muted); margin-bottom: 2rem;">You got ${correctCount} out of ${state.activeQuiz.questions.length} questions correct.</p>
                            <div style="display: flex; gap: 1rem; justify-content: center;">
                                <button class="btn" id="retry-quiz">Retry Quiz</button>
                                <button class="btn btn-secondary" id="quiz-list-return">Back to Quizzes</button>
                            </div>
                        </div>
                    `;
                    lucide.createIcons();

                    document.getElementById('retry-quiz').addEventListener('click', () => startQuiz(state.activeQuiz.id));
                    document.getElementById('quiz-list-return').addEventListener('click', () => {
                        state.activeQuiz = null;
                        renderView();
                    });
                }
            });
        }

        const prevBtn = document.getElementById('prev-q');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (state.currentQuestionIndex > 0) {
                    state.currentQuestionIndex--;
                    state.quizSubmitted = state.quizAnswers[state.currentQuestionIndex] !== undefined;
                    renderView();
                }
            });
        }
    }

    // 4. Flashcards View
    function renderFlashcards() {
        const card = state.flashcardsShuffled[state.currentFlashcardIndex];
        const isKnown = state.knownCards.includes(card.term);

        return `
            <div class="flashcard-wrapper">
                <div style="width: 100%; display: flex; justify-content: space-between; margin-bottom: 1rem; color: var(--text-muted); font-size: 0.9rem;">
                    <span>Card ${state.currentFlashcardIndex + 1} of ${state.flashcardsShuffled.length}</span>
                    <span>${isKnown ? '✅ Mastered' : ''}</span>
                </div>
                <div class="flashcard" id="flashcard-box">
                    <div id="flashcard-content">
                        <h3 style="color: var(--primary); margin-bottom: 0.5rem; font-size: 1.1rem;">TERM</h3>
                        <p>${card.term}</p>
                    </div>
                    <span class="flashcard-hint">Click to flip card</span>
                </div>
                <div class="flashcard-controls">
                    <button class="btn btn-secondary" id="prev-card"><i data-lucide="chevron-left"></i> Previous</button>
                    <button class="btn" id="mark-known-btn"><i data-lucide="${isKnown ? 'check-check' : 'check'}"></i> ${isKnown ? 'Mastered' : 'Mark as Known'}</button>
                    <button class="btn btn-secondary" id="shuffle-cards"><i data-lucide="shuffle"></i> Shuffle</button>
                    <button class="btn btn-secondary" id="next-card">Next <i data-lucide="chevron-right"></i></button>
                </div>
            </div>
        `;
    }

    let isFlipped = false;
    function attachFlashcardListeners() {
        const box = document.getElementById('flashcard-box');
        const card = state.flashcardsShuffled[state.currentFlashcardIndex];

        box.addEventListener('click', () => {
            isFlipped = !isFlipped;
            const content = document.getElementById('flashcard-content');
            if (isFlipped) {
                content.innerHTML = `
                    <h3 style="color: var(--success); margin-bottom: 0.5rem; font-size: 1.1rem;">DEFINITION</h3>
                    <p style="font-size: 1.1rem; line-height: 1.5;">${card.definition}</p>
                `;
            } else {
                content.innerHTML = `
                    <h3 style="color: var(--primary); margin-bottom: 0.5rem; font-size: 1.1rem;">TERM</h3>
                    <p>${card.term}</p>
                `;
            }
        });

        document.getElementById('next-card').addEventListener('click', (e) => {
            e.stopPropagation();
            isFlipped = false;
            state.currentFlashcardIndex = (state.currentFlashcardIndex + 1) % state.flashcardsShuffled.length;
            renderView();
        });

        document.getElementById('prev-card').addEventListener('click', (e) => {
            e.stopPropagation();
            isFlipped = false;
            state.currentFlashcardIndex = (state.currentFlashcardIndex - 1 + state.flashcardsShuffled.length) % state.flashcardsShuffled.length;
            renderView();
        });

        document.getElementById('shuffle-cards').addEventListener('click', (e) => {
            e.stopPropagation();
            isFlipped = false;
            state.flashcardsShuffled.sort(() => Math.random() - 0.5);
            state.currentFlashcardIndex = 0;
            renderView();
        });

        document.getElementById('mark-known-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            if (state.knownCards.includes(card.term)) {
                state.knownCards = state.knownCards.filter(t => t !== card.term);
            } else {
                state.knownCards.push(card.term);
            }
            saveState();
            renderView();
        });
    }

    // 5. Progress View
    function renderProgress() {
        return `
            <div clas
const curriculum = {
    8: {
        'Английски език': 'Подготовка за международни изпити.'
    },
    9: {
    },
    10: {

    },
    11: {

    },
    12: {

    }
};

// Икони за различните предмети
const subjectIcons = {
    
};

let currentGrade = null;
let isAnimating = false;

function showGrade(grade) {
    if (currentGrade === grade || isAnimating) return;
    isAnimating = true;
    
    const gradeTitle = document.getElementById('grade-title');
    const subjectsDiv = document.getElementById('subjects');
    
    // Анимация за изчезване
    subjectsDiv.style.opacity = '0';
    subjectsDiv.style.transform = 'translateY(-20px)';
    
    // Анимация за заглавието
    gradeTitle.classList.remove('animate');
    void gradeTitle.offsetWidth; // Форсираме reflow
    gradeTitle.classList.add('animate');
    
    setTimeout(() => {
        gradeTitle.textContent = `${grade} клас`;
        subjectsDiv.innerHTML = '';

        const subjects = curriculum[grade];
        
        // Проверка за празни данни
        if (!subjects || Object.keys(subjects).length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'empty-message';
            emptyMessage.textContent = 'Информацията за този клас скоро ще бъде добавена.';
            subjectsDiv.appendChild(emptyMessage);
            subjectsDiv.style.opacity = '1';
            subjectsDiv.style.transform = 'translateY(0)';
            isAnimating = false;
            return;
        }

        // Създаваме контейнер за подредба
        const gridContainer = document.createElement('div');
        gridContainer.className = 'subjects-grid';
        subjectsDiv.appendChild(gridContainer);

        // Сортираме предметите по азбучен ред
        const sortedSubjects = Object.entries(subjects).sort((a, b) => a[0].localeCompare(b[0]));
        let delay = 0;

        for (const [subject, description] of sortedSubjects) {
            const subjectElement = document.createElement('div');
            subjectElement.className = 'subject';
            subjectElement.style.opacity = '0';
            subjectElement.style.transform = 'translateY(20px)';
            subjectElement.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            subjectElement.style.transitionDelay = `${delay}s`;
            
            const icon = subjectIcons[subject] || '📖';
            
            subjectElement.innerHTML = `
                <h3>
                    <span class="subject-icon">${icon}</span>
                    ${subject}
                </h3>
                <p>${description}</p>
            `;
            
            gridContainer.appendChild(subjectElement);
            delay += 0.1;
            
            // Форсираме reflow за анимацията
            subjectElement.offsetHeight;
            
            setTimeout(() => {
                subjectElement.style.opacity = '1';
                subjectElement.style.transform = 'translateY(0)';
            }, 50);
        }
        
        // Показваме съдържанието с анимация
        subjectsDiv.style.opacity = '1';
        subjectsDiv.style.transform = 'translateY(0)';
        
        setTimeout(() => {
            isAnimating = false;
        }, delay * 1000 + 500);
    }, 300);

    // Активен бутон с плавна анимация
    document.querySelectorAll('.buttons button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.includes(grade.toString())) {
            btn.classList.add('active');
        }
    });

    currentGrade = grade;
}

// Добавяме клавиатурна навигация
document.addEventListener('keydown', (e) => {
    if (currentGrade && !isAnimating) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            const nextGrade = Math.min(currentGrade + 1, 12);
            if (nextGrade !== currentGrade) showGrade(nextGrade);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            const prevGrade = Math.max(currentGrade - 1, 8);
            if (prevGrade !== currentGrade) showGrade(prevGrade);
        }
    }
});

// Инициализация при зареждане
document.addEventListener('DOMContentLoaded', () => {
    // Добавяме клас за активен бутон при клик
    document.querySelectorAll('.buttons button').forEach(button => {
        button.addEventListener('click', function() {
            if (!isAnimating) {
                const grade = parseInt(this.textContent);
                showGrade(grade);
            }
        });
    });

    // Задаваме начално състояние
    const gradeTitle = document.getElementById('grade-title');
    const subjectsDiv = document.getElementById('subjects');
    
    gradeTitle.textContent = 'Изберете клас';
    gradeTitle.classList.add('initial');
    subjectsDiv.innerHTML = '';
    
    // Добавяме съобщение за начален избор
    const initialMessage = document.createElement('div');
    initialMessage.className = 'empty-message';
    initialMessage.innerHTML = `
        <i class="fas fa-hand-point-up" style="font-size: 2rem; margin-bottom: 15px; color: #1a73e8;"></i>
        <p>Моля, изберете клас от бутоните по-горе, за да видите учебната програма.</p>
    `;
    subjectsDiv.appendChild(initialMessage);
}); 
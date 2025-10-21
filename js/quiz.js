// One Direction Quiz Game - JavaScript

class QuizGame {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.questions = [];
        this.selectedDifficulty = 'medium';
        this.questionsPerQuiz = 20;
        this.userAnswers = [];
        
        this.init();
    }
    
    init() {
        this.generateQuestions();
        this.bindEvents();
    }
    
    bindEvents() {
        // Difficulty selection
        document.querySelectorAll('.btn-difficulty').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectedDifficulty = e.currentTarget.dataset.level;
                this.startQuiz();
            });
        });
        
        // Next button
        document.getElementById('next-button').addEventListener('click', () => {
            this.nextQuestion();
        });
        
        // Retry button
        document.getElementById('retry-button').addEventListener('click', () => {
            this.resetQuiz();
        });
        
        // Home button
        document.getElementById('home-button').addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
    
    generateQuestions() {
        const allQuestions = [
            // Easy Questions
            {
                level: 'easy',
                category: 'Members',
                question: "Which member left One Direction in 2015?",
                options: ["Zayn Malik", "Liam Payne", "Louis Tomlinson", "Niall Horan"],
                correct: 0,
                explanation: "Zayn Malik left the band in March 2015 to pursue a solo career."
            },
            {
                level: 'easy',
                category: 'Songs',
                question: "What was One Direction's debut single?",
                options: ["Gotta Be You", "What Makes You Beautiful", "One Thing", "Live While We're Young"],
                correct: 1,
                explanation: "'What Makes You Beautiful' was released in 2011 as their first single."
            },
            {
                level: 'easy',
                category: 'Origins',
                question: "On which TV show was One Direction formed?",
                options: ["Britain's Got Talent", "The Voice", "The X Factor", "American Idol"],
                correct: 2,
                explanation: "The boys were brought together on The X Factor UK in 2010."
            },
            {
                level: 'easy',
                category: 'Members',
                question: "Which member is from Ireland?",
                options: ["Harry Styles", "Niall Horan", "Louis Tomlinson", "Liam Payne"],
                correct: 1,
                explanation: "Niall Horan is from Mullingar, Ireland."
            },
            {
                level: 'easy',
                category: 'Albums',
                question: "What was their first album called?",
                options: ["Take Me Home", "Up All Night", "Midnight Memories", "Four"],
                correct: 1,
                explanation: "'Up All Night' was released in 2011 as their debut album."
            },
            
            // Medium Questions
            {
                level: 'medium',
                category: 'Timeline',
                question: "In what year did One Direction go on hiatus?",
                options: ["2015", "2016", "2017", "2018"],
                correct: 1,
                explanation: "The band announced their hiatus in 2016 after releasing 'Made in the A.M.'"
            },
            {
                level: 'medium',
                category: 'Songs',
                question: "Which song contains the line 'You're turning heads when you walk through the door'?",
                options: ["Story of My Life", "What Makes You Beautiful", "Best Song Ever", "Night Changes"],
                correct: 1,
                explanation: "This is from 'What Makes You Beautiful', their breakthrough hit."
            },
            {
                level: 'medium',
                category: 'Albums',
                question: "Which album featured the song 'Story of My Life'?",
                options: ["Take Me Home", "Midnight Memories", "Four", "Made in the A.M."],
                correct: 1,
                explanation: "'Story of My Life' was the lead single from 'Midnight Memories' (2013)."
            },
            {
                level: 'medium',
                category: 'Members',
                question: "Which member was born on Christmas Eve?",
                options: ["Harry Styles", "Louis Tomlinson", "Liam Payne", "Zayn Malik"],
                correct: 1,
                explanation: "Louis Tomlinson was born on December 24, 1991."
            },
            {
                level: 'medium',
                category: 'Solo Careers',
                question: "What was Harry Styles' debut solo single?",
                options: ["Watermelon Sugar", "Adore You", "Sign of the Times", "Golden"],
                correct: 2,
                explanation: "'Sign of the Times' was released in 2017 as Harry's first solo single."
            },
            
            // Hard Questions
            {
                level: 'hard',
                category: 'Deep Cuts',
                question: "Which song was written about the band's journey and fanbase?",
                options: ["History", "Infinity", "Perfect", "Drag Me Down"],
                correct: 0,
                explanation: "'History' was their emotional farewell song about their journey together."
            },
            {
                level: 'hard',
                category: 'Timeline',
                question: "How many weeks did 'What Makes You Beautiful' spend at #1 in the UK?",
                options: ["1 week", "2 weeks", "3 weeks", "4 weeks"],
                correct: 2,
                explanation: "The song spent 3 weeks at number one on the UK Singles Chart."
            },
            {
                level: 'hard',
                category: 'Albums',
                question: "Which album was their first to debut at #1 in the US?",
                options: ["Up All Night", "Take Me Home", "Midnight Memories", "Four"],
                correct: 1,
                explanation: "'Take Me Home' was their first album to debut at #1 on the Billboard 200."
            },
            {
                level: 'hard',
                category: 'Members',
                question: "Which member auditioned first on The X Factor?",
                options: ["Liam Payne", "Harry Styles", "Niall Horan", "Louis Tomlinson"],
                correct: 0,
                explanation: "Liam had actually auditioned for X Factor before, in 2008 when he was 14."
            },
            {
                level: 'hard',
                category: 'Awards',
                question: "How many BRIT Awards did One Direction win as a group?",
                options: ["2", "3", "4", "5"],
                correct: 2,
                explanation: "They won 4 BRIT Awards: Global Success (2012, 2013), British Video (2013), and British Artist Video (2014)."
            },
            
            // More questions for variety
            {
                level: 'easy',
                category: 'Fun Facts',
                question: "Which member is afraid of spoons?",
                options: ["Harry Styles", "Liam Payne", "Niall Horan", "Louis Tomlinson"],
                correct: 1,
                explanation: "Liam Payne has a well-known phobia of spoons!"
            },
            {
                level: 'medium',
                category: 'Tours',
                question: "What was their final tour as a five-piece?",
                options: ["Take Me Home Tour", "Where We Are Tour", "On The Road Again Tour", "Up All Night Tour"],
                correct: 1,
                explanation: "The Where We Are Tour (2014) was their last tour with Zayn."
            },
            {
                level: 'hard',
                category: 'Recordings',
                question: "Which album was recorded after Zayn left the band?",
                options: ["Four", "Made in the A.M.", "Midnight Memories", "Take Me Home"],
                correct: 1,
                explanation: "'Made in the A.M.' was completed as a four-piece after Zayn's departure."
            },
            {
                level: 'medium',
                category: 'Collaborations',
                question: "Which member co-wrote songs with Ed Sheeran?",
                options: ["All of them", "Just Harry", "Harry and Louis", "None of them"],
                correct: 0,
                explanation: "Ed Sheeran wrote several songs for the band including 'Moments' and 'Little Things'."
            },
            {
                level: 'easy',
                category: 'Geography',
                question: "Harry Styles is from which English town?",
                options: ["Manchester", "Holmes Chapel", "Bradford", "Doncaster"],
                correct: 1,
                explanation: "Harry is from Holmes Chapel in Cheshire, England."
            }
        ];
        
        // Filter questions based on difficulty and shuffle
        let availableQuestions = allQuestions.filter(q => {
            if (this.selectedDifficulty === 'easy') return q.level === 'easy';
            if (this.selectedDifficulty === 'medium') return q.level === 'easy' || q.level === 'medium';
            return true; // hard includes all levels
        });
        
        // Shuffle and select questions
        availableQuestions = this.shuffleArray(availableQuestions);
        this.questions = availableQuestions.slice(0, this.questionsPerQuiz);
    }
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    startQuiz() {
        document.getElementById('quiz-start').classList.add('hidden');
        document.getElementById('quiz-game').classList.remove('hidden');
        document.getElementById('total-questions').textContent = this.questions.length;
        this.displayQuestion();
    }
    
    displayQuestion() {
        const question = this.questions[this.currentQuestion];
        
        document.getElementById('current-question').textContent = this.currentQuestion + 1;
        document.getElementById('question-num').textContent = this.currentQuestion + 1;
        document.getElementById('question-text').textContent = question.question;
        
        // Update progress
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        document.getElementById('progress-fill').style.width = progress + '%';
        
        // Generate answer options
        const optionsContainer = document.getElementById('answer-options');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'answer-option';
            button.textContent = option;
            button.addEventListener('click', () => this.selectAnswer(index));
            optionsContainer.appendChild(button);
        });
        
        // Hide feedback and next button
        document.getElementById('question-feedback').classList.add('hidden');
        document.getElementById('next-button').classList.add('hidden');
    }
    
    selectAnswer(selectedIndex) {
        const question = this.questions[this.currentQuestion];
        const options = document.querySelectorAll('.answer-option');
        const isCorrect = selectedIndex === question.correct;
        
        // Store user answer
        this.userAnswers.push({
            question: question.question,
            selected: selectedIndex,
            correct: question.correct,
            isCorrect: isCorrect,
            category: question.category
        });
        
        // Update score
        if (isCorrect) {
            this.score++;
            document.getElementById('current-score').textContent = this.score;
        }
        
        // Disable all options and show results
        options.forEach((option, index) => {
            option.classList.add('disabled');
            if (index === question.correct) {
                option.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                option.classList.add('incorrect');
            }
        });
        
        // Show feedback
        this.showFeedback(isCorrect, question.explanation);
        
        // Show next button or finish quiz
        setTimeout(() => {
            if (this.currentQuestion < this.questions.length - 1) {
                document.getElementById('next-button').classList.remove('hidden');
            } else {
                document.getElementById('next-button').textContent = 'See Results';
                document.getElementById('next-button').classList.remove('hidden');
            }
        }, 1000);
    }
    
    showFeedback(isCorrect, explanation) {
        const feedback = document.getElementById('question-feedback');
        const icon = document.getElementById('feedback-icon');
        const text = document.getElementById('feedback-text');
        
        if (isCorrect) {
            icon.textContent = '🎉';
            text.textContent = `Correct! ${explanation}`;
            feedback.style.background = 'var(--sticker-green)';
        } else {
            icon.textContent = '💔';
            text.textContent = `Oops! ${explanation}`;
            feedback.style.background = 'var(--sticker-pink)';
        }
        
        feedback.classList.remove('hidden');
    }
    
    nextQuestion() {
        this.currentQuestion++;
        
        if (this.currentQuestion < this.questions.length) {
            this.displayQuestion();
        } else {
            this.showResults();
        }
    }
    
    showResults() {
        document.getElementById('quiz-game').classList.add('hidden');
        document.getElementById('quiz-results').classList.remove('hidden');
        
        const percentage = Math.round((this.score / this.questions.length) * 100);
        
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('score-percentage').textContent = percentage + '%';
        
        // Generate result message and badge
        this.generateResultMessage(percentage);
        this.generateResultBreakdown();
    }
    
    generateResultMessage(percentage) {
        const messageEl = document.getElementById('result-message');
        const badgeEl = document.getElementById('achievement-badge');
        
        let message, badge;
        
        if (percentage >= 90) {
            message = "Incredible! You're a true One Direction superfan! You know the boys inside and out! 🏆";
            badge = "🏆<br>ULTIMATE<br>DIRECTIONER";
            badgeEl.style.background = 'gold';
        } else if (percentage >= 75) {
            message = "Amazing! You definitely know your One Direction history. The boys would be proud! ⭐";
            badge = "⭐<br>TRUE<br>FAN";
            badgeEl.style.background = 'var(--sticker-blue)';
        } else if (percentage >= 60) {
            message = "Great job! You're a solid Directioner with good knowledge of the band! 💙";
            badge = "💙<br>GOOD<br>FAN";
            badgeEl.style.background = 'var(--sticker-pink)';
        } else if (percentage >= 40) {
            message = "Not bad! You know some basics, but there's more to discover about 1D! Keep listening! 🎵";
            badge = "🎵<br>CASUAL<br>LISTENER";
            badgeEl.style.background = 'var(--highlight-yellow)';
        } else {
            message = "Time to dive deeper into the One Direction discography! There's so much amazing music to explore! 📚";
            badge = "📚<br>LEARNER";
            badgeEl.style.background = 'var(--paper-aged)';
        }
        
        messageEl.textContent = message;
        badgeEl.innerHTML = badge;
    }
    
    generateResultBreakdown() {
        const breakdownEl = document.getElementById('result-breakdown');
        const categories = {};
        
        // Group answers by category
        this.userAnswers.forEach(answer => {
            if (!categories[answer.category]) {
                categories[answer.category] = { correct: 0, total: 0 };
            }
            categories[answer.category].total++;
            if (answer.isCorrect) {
                categories[answer.category].correct++;
            }
        });
        
        // Generate breakdown HTML
        let html = '<h4 style="font-family: var(--font-handwritten); color: var(--ink-blue); margin-bottom: 1rem;">Category Breakdown:</h4>';
        
        Object.entries(categories).forEach(([category, stats]) => {
            const percentage = Math.round((stats.correct / stats.total) * 100);
            html += `
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-family: var(--font-body);">
                    <span>${category}:</span>
                    <span style="color: var(--ink-red);">${stats.correct}/${stats.total} (${percentage}%)</span>
                </div>
            `;
        });
        
        breakdownEl.innerHTML = html;
    }
    
    resetQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        
        document.getElementById('quiz-results').classList.add('hidden');
        document.getElementById('quiz-start').classList.remove('hidden');
        document.getElementById('current-score').textContent = '0';
        
        this.generateQuestions();
    }
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuizGame();
});
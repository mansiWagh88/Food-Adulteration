// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Quiz Functionality
const quizData = [
    {
        question: "What is the most common method used to adulterate milk?",
        options: [
            "Adding water",
            "Adding starch",
            "Adding synthetic milk",
            "All of the above"
        ],
        correct: 3,
        explanation: "Milk is commonly adulterated with water, starch, and synthetic milk to increase volume and profits."
    },
    {
        question: "Which of the following is a sign of adulterated honey?",
        options: [
            "It dissolves quickly in water",
            "It has a strong floral aroma",
            "It crystallizes naturally",
            "It has a thick consistency"
        ],
        correct: 0,
        explanation: "Pure honey dissolves slowly in water, while adulterated honey dissolves quickly due to added sugar syrup."
    },
    {
        question: "What health risk is associated with consuming adulterated oils?",
        options: [
            "Immediate food poisoning",
            "Long-term cardiovascular problems",
            "Allergic reactions only",
            "No health risks"
        ],
        correct: 1,
        explanation: "Adulterated oils can cause long-term cardiovascular problems due to harmful chemicals and trans fats."
    },
    {
        question: "How can you test for starch adulteration in milk at home?",
        options: [
            "Add salt to the milk",
            "Add iodine solution",
            "Heat the milk",
            "Add vinegar"
        ],
        correct: 1,
        explanation: "Adding iodine solution to milk will turn it blue if starch has been added as an adulterant."
    },
    {
        question: "Which food item is most commonly adulterated with artificial colors?",
        options: [
            "Rice",
            "Spices",
            "Milk",
            "Honey"
        ],
        correct: 1,
        explanation: "Spices are commonly adulterated with artificial colors to enhance their appearance and hide poor quality."
    }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// Quiz Elements
const quizStart = document.getElementById('quiz-start');
const quizContent = document.getElementById('quiz-content');
const quizResults = document.getElementById('quiz-results');
const startQuizBtn = document.getElementById('start-quiz');
const questionContainer = document.getElementById('question-container');
const questionCounter = document.getElementById('question-counter');
const progressFill = document.getElementById('progress-fill');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const scoreDisplay = document.getElementById('score-display');
const restartQuizBtn = document.getElementById('restart-quiz');

// Start Quiz
startQuizBtn.addEventListener('click', () => {
    quizStart.style.display = 'none';
    quizContent.style.display = 'block';
    loadQuestion();
});

// Load Question
function loadQuestion() {
    const question = quizData[currentQuestion];
    questionCounter.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    progressFill.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;
    
    questionContainer.innerHTML = `
        <div class="question">${question.question}</div>
        <div class="options">
            ${question.options.map((option, index) => `
                <div class="option ${userAnswers[currentQuestion] === index ? 'selected' : ''}" 
                     data-index="${index}">
                    ${option}
                </div>
            `).join('')}
        </div>
    `;
    
    // Add event listeners to options
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', () => {
            selectOption(parseInt(option.dataset.index));
        });
    });
    
    // Update button states
    prevBtn.style.display = currentQuestion === 0 ? 'none' : 'block';
    nextBtn.textContent = currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next';
}

// Select Option
function selectOption(optionIndex) {
    userAnswers[currentQuestion] = optionIndex;
    
    // Update visual selection
    document.querySelectorAll('.option').forEach((option, index) => {
        option.classList.toggle('selected', index === optionIndex);
    });
}

// Navigation Buttons
prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
});

nextBtn.addEventListener('click', () => {
    if (userAnswers[currentQuestion] === undefined) {
        alert('Please select an answer before proceeding.');
        return;
    }
    
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResults();
    }
});

// Show Results
function showResults() {
    quizContent.style.display = 'none';
    quizResults.style.display = 'block';
    
    // Calculate score
    score = 0;
    quizData.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            score++;
        }
    });
    
    const percentage = Math.round((score / quizData.length) * 100);
    let feedback = '';
    
    if (percentage >= 80) {
        feedback = 'Excellent! You have a strong understanding of food adulteration detection.';
    } else if (percentage >= 60) {
        feedback = 'Good job! You know the basics, but there\'s room for improvement.';
    } else {
        feedback = 'Keep learning! Understanding food adulteration is crucial for your health and safety.';
    }
    
    scoreDisplay.innerHTML = `
        <div class="score">${score}/${quizData.length}</div>
        <div class="score-text">You scored ${percentage}%</div>
        <div class="feedback">${feedback}</div>
        <div class="detailed-results">
            <h4>Detailed Results:</h4>
            ${quizData.map((question, index) => {
                const isCorrect = userAnswers[index] === question.correct;
                const userAnswer = question.options[userAnswers[index]];
                const correctAnswer = question.options[question.correct];
                
                return `
                    <div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
                        <strong>Question ${index + 1}:</strong> ${question.question}
                        <br>
                        <strong>Your Answer:</strong> ${userAnswer}
                        ${!isCorrect ? `<br><strong>Correct Answer:</strong> ${correctAnswer}` : ''}
                        <br>
                        <strong>Explanation:</strong> ${question.explanation}
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// Restart Quiz
restartQuizBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    quizResults.style.display = 'none';
    quizStart.style.display = 'block';
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.hazard-card, .method-card, .prevention-card, .stat-item, .food-type');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add CSS for detailed results
const style = document.createElement('style');
style.textContent = `
    .detailed-results {
        margin-top: 2rem;
        text-align: left;
    }
    
    .detailed-results h4 {
        color: #2c5530;
        margin-bottom: 1rem;
        font-size: 1.2rem;
    }
    
    .result-item {
        background: #f8f9fa;
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 10px;
        border-left: 4px solid #4CAF50;
    }
    
    .result-item.incorrect {
        border-left-color: #f44336;
    }
    
    .result-item strong {
        color: #2c5530;
    }
    
    .result-item.correct {
        background: #e8f5e8;
    }
    
    .result-item.incorrect {
        background: #ffebee;
    }
`;
document.head.appendChild(style);

// Add loading animation for quiz
function showLoading(element) {
    element.innerHTML = '<div class="loading"></div>';
}

// Add error handling
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// Add keyboard navigation for quiz
document.addEventListener('keydown', (e) => {
    if (quizContent.style.display !== 'none') {
        if (e.key >= '1' && e.key <= '4') {
            const optionIndex = parseInt(e.key) - 1;
            if (optionIndex < quizData[currentQuestion].options.length) {
                selectOption(optionIndex);
            }
        } else if (e.key === 'Enter') {
            nextBtn.click();
        } else if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    }
});

// Add touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentQuestion < quizData.length - 1) {
            // Swipe left - next question
            nextBtn.click();
        } else if (diff < 0 && currentQuestion > 0) {
            // Swipe right - previous question
            prevBtn.click();
        }
    }
}

// Add progress indicator for quiz
function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressFill.style.width = `${progress}%`;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling polyfill for older browsers
    if (!('scrollBehavior' in document.documentElement.style)) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
        document.head.appendChild(script);
    }
    
    // Add focus management for accessibility
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('focus', () => {
            link.style.outline = '2px solid #4CAF50';
            link.style.outlineOffset = '2px';
        });
        
        link.addEventListener('blur', () => {
            link.style.outline = 'none';
        });
    });
    
    // Add ARIA labels for better accessibility
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        hamburger.setAttribute('aria-expanded', 'false');
        
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
        });
    }
});

// Live Chat Functionality
const chatWidget = document.getElementById('chat-widget');
const chatHeader = document.getElementById('chat-header');
const chatToggle = document.getElementById('chat-toggle');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input-field');
const chatSend = document.getElementById('chat-send');

let isChatOpen = false;

// Chat responses
const chatResponses = {
    'How to detect adulterated milk?': {
        text: 'To detect adulterated milk, you can try these simple tests:\n\n1. **Iodine Test**: Add a drop of iodine to milk. If it turns blue, starch has been added.\n\n2. **Water Test**: Pure milk should not separate when left standing.\n\n3. **Taste Test**: Adulterated milk may taste different or have unusual consistency.\n\n4. **Boiling Test**: Pure milk forms a thick layer when boiled.',
        quickReplies: ['What are common adulterants?', 'Report food safety issue']
    },
    'What are common adulterants?': {
        text: 'Common food adulterants include:\n\n• **Milk**: Water, starch, synthetic milk\n• **Honey**: Sugar syrup, corn syrup\n• **Spices**: Artificial colors, sawdust\n• **Oils**: Cheaper oils, chemicals\n• **Grains**: Stones, dust, other grains\n• **Sugar**: Chalk powder, washing soda\n\nThese adulterants are added to increase profits or improve appearance.',
        quickReplies: ['How to detect adulterated milk?', 'Report food safety issue']
    },
    'Report food safety issue': {
        text: 'To report a food safety issue:\n\n1. **Stop consuming** the product immediately\n2. **Preserve a sample** in a sealed container\n3. **Contact authorities**:\n   • Emergency: 1-800-FOOD-SAFE\n   • Email: safety@foodawareness.org\n   • Local food safety department\n\n4. **Provide details**:\n   • Product name and brand\n   • Purchase location and date\n   • Symptoms experienced\n   • Batch number if available',
        quickReplies: ['How to detect adulterated milk?', 'What are common adulterants?']
    }
};

// Default responses for unknown queries
const defaultResponses = [
    "I'm here to help with food safety questions. Try asking about detecting adulterated food, common adulterants, or how to report issues.",
    "For food safety concerns, you can ask me about detection methods, common adulterants, or how to report problems.",
    "I can help you with food adulteration detection, health risks, and reporting procedures. What would you like to know?"
];

// Toggle chat
chatHeader.addEventListener('click', () => {
    if (!isChatOpen) {
        openChat();
    }
});

chatToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    closeChat();
});

function openChat() {
    isChatOpen = true;
    chatWidget.classList.add('active');
    chatToggle.innerHTML = '<i class="fas fa-times"></i>';
    chatInput.focus();
}

function closeChat() {
    isChatOpen = false;
    chatWidget.classList.remove('active');
    chatToggle.innerHTML = '<i class="fas fa-comments"></i>';
}

// Send message
chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        addUserMessage(message);
        chatInput.value = '';
        
        // Simulate typing delay
        setTimeout(() => {
            const response = getChatResponse(message);
            addBotMessage(response.text, response.quickReplies);
        }, 1000);
    }
}

function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
        <i class="fas fa-user"></i>
        <div class="message-content">
            <p>${text}</p>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function addBotMessage(text, quickReplies = []) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    
    let quickRepliesHTML = '';
    if (quickReplies.length > 0) {
        quickRepliesHTML = `
            <div class="quick-replies">
                ${quickReplies.map(reply => `
                    <button class="quick-reply" data-reply="${reply}">${reply}</button>
                `).join('')}
            </div>
        `;
    }
    
    messageDiv.innerHTML = `
        <i class="fas fa-robot"></i>
        <div class="message-content">
            <p>${text.replace(/\n/g, '<br>')}</p>
            ${quickRepliesHTML}
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
    
    // Add event listeners to quick replies
    messageDiv.querySelectorAll('.quick-reply').forEach(button => {
        button.addEventListener('click', () => {
            const reply = button.dataset.reply;
            addUserMessage(reply);
            setTimeout(() => {
                const response = getChatResponse(reply);
                addBotMessage(response.text, response.quickReplies);
            }, 1000);
        });
    });
}

function getChatResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check for exact matches
    for (const [key, response] of Object.entries(chatResponses)) {
        if (lowerMessage.includes(key.toLowerCase())) {
            return response;
        }
    }
    
    // Check for keyword matches
    if (lowerMessage.includes('milk') || lowerMessage.includes('detect')) {
        return chatResponses['How to detect adulterated milk?'];
    } else if (lowerMessage.includes('adulterant') || lowerMessage.includes('common')) {
        return chatResponses['What are common adulterants?'];
    } else if (lowerMessage.includes('report') || lowerMessage.includes('issue')) {
        return chatResponses['Report food safety issue'];
    }
    
    // Default response
    const randomResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    return {
        text: randomResponse,
        quickReplies: ['How to detect adulterated milk?', 'What are common adulterants?', 'Report food safety issue']
    };
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Emergency Banner
const emergencyBanner = document.getElementById('emergency-banner');
const emergencyClose = document.getElementById('emergency-close');

// Show emergency banner after 5 seconds
setTimeout(() => {
    emergencyBanner.classList.add('show');
}, 5000);

emergencyClose.addEventListener('click', () => {
    emergencyBanner.classList.remove('show');
});

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Enhanced Animations with Intersection Observer
const enhancedObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const enhancedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add staggered animation for cards
            if (entry.target.classList.contains('hazard-card') || 
                entry.target.classList.contains('method-card') || 
                entry.target.classList.contains('prevention-card')) {
                entry.target.style.animationDelay = `${entry.target.dataset.delay || 0}s`;
                entry.target.style.animation = 'slideInFromBottom 0.6s ease forwards';
            }
        }
    });
}, enhancedObserverOptions);

// Observe elements with enhanced animations
document.addEventListener('DOMContentLoaded', () => {
    const enhancedElements = document.querySelectorAll('.hazard-card, .method-card, .prevention-card, .stat-item, .food-type');
    
    enhancedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.dataset.delay = (index * 0.1).toString();
        enhancedObserver.observe(el);
    });
});

// Enhanced Quiz with Sound Effects (optional)
function playQuizSound(type) {
    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    if (type === 'correct') {
        // Play success sound
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    } else if (type === 'incorrect') {
        // Play error sound
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(300, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    }
}

// Enhanced Quiz Results with Animations
function showEnhancedResults() {
    quizContent.style.display = 'none';
    quizResults.style.display = 'block';
    
    // Calculate score
    score = 0;
    quizData.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            score++;
        }
    });
    
    const percentage = Math.round((score / quizData.length) * 100);
    let feedback = '';
    let emoji = '';
    
    if (percentage >= 80) {
        feedback = 'Excellent! You have a strong understanding of food adulteration detection.';
        emoji = '🎉';
    } else if (percentage >= 60) {
        feedback = 'Good job! You know the basics, but there\'s room for improvement.';
        emoji = '👍';
    } else {
        feedback = 'Keep learning! Understanding food adulteration is crucial for your health and safety.';
        emoji = '📚';
    }
    
    // Animate score display
    scoreDisplay.innerHTML = `
        <div class="score" style="opacity: 0; transform: scale(0.5);">${score}/${quizData.length}</div>
        <div class="score-text" style="opacity: 0; transform: translateY(20px);">You scored ${percentage}% ${emoji}</div>
        <div class="feedback" style="opacity: 0; transform: translateY(20px);">${feedback}</div>
        <div class="detailed-results" style="opacity: 0; transform: translateY(20px);">
            <h4>Detailed Results:</h4>
            ${quizData.map((question, index) => {
                const isCorrect = userAnswers[index] === question.correct;
                const userAnswer = question.options[userAnswers[index]];
                const correctAnswer = question.options[question.correct];
                
                return `
                    <div class="result-item ${isCorrect ? 'correct' : 'incorrect'}" style="opacity: 0; transform: translateX(${isCorrect ? '-20px' : '20px'});">
                        <strong>Question ${index + 1}:</strong> ${question.question}
                        <br>
                        <strong>Your Answer:</strong> ${userAnswer}
                        ${!isCorrect ? `<br><strong>Correct Answer:</strong> ${correctAnswer}` : ''}
                        <br>
                        <strong>Explanation:</strong> ${question.explanation}
                    </div>
                `;
            }).join('')}
        </div>
    `;
    
    // Animate elements with delays
    setTimeout(() => {
        scoreDisplay.querySelector('.score').style.transition = 'all 0.6s ease';
        scoreDisplay.querySelector('.score').style.opacity = '1';
        scoreDisplay.querySelector('.score').style.transform = 'scale(1)';
    }, 100);
    
    setTimeout(() => {
        scoreDisplay.querySelector('.score-text').style.transition = 'all 0.6s ease';
        scoreDisplay.querySelector('.score-text').style.opacity = '1';
        scoreDisplay.querySelector('.score-text').style.transform = 'translateY(0)';
    }, 300);
    
    setTimeout(() => {
        scoreDisplay.querySelector('.feedback').style.transition = 'all 0.6s ease';
        scoreDisplay.querySelector('.feedback').style.opacity = '1';
        scoreDisplay.querySelector('.feedback').style.transform = 'translateY(0)';
    }, 500);
    
    setTimeout(() => {
        scoreDisplay.querySelector('.detailed-results').style.transition = 'all 0.6s ease';
        scoreDisplay.querySelector('.detailed-results').style.opacity = '1';
        scoreDisplay.querySelector('.detailed-results').style.transform = 'translateY(0)';
        
        // Animate result items
        const resultItems = scoreDisplay.querySelectorAll('.result-item');
        resultItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 200);
        });
    }, 700);
}

// Replace the original showResults function
const originalShowResults = showResults;
showResults = showEnhancedResults;

// Enhanced Mobile Touch Support
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleVerticalSwipe();
});

function handleVerticalSwipe() {
    const swipeThreshold = 100;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && window.scrollY > 0) {
            // Swipe up - scroll up
            window.scrollBy({
                top: -100,
                behavior: 'smooth'
            });
        } else if (diff < 0) {
            // Swipe down - scroll down
            window.scrollBy({
                top: 100,
                behavior: 'smooth'
            });
        }
    }
}

// Enhanced Error Handling
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    
    // Show user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f44336;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 10000;
        animation: slideInFromRight 0.3s ease;
    `;
    errorDiv.textContent = 'Something went wrong. Please refresh the page.';
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
});

// Performance Optimization
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
        // Update navbar
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        // Update back to top button
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }, 10);
});

// Enhanced Accessibility
document.addEventListener('keydown', (e) => {
    // Escape key to close chat
    if (e.key === 'Escape' && isChatOpen) {
        closeChat();
    }
    
    // Space key to toggle emergency banner
    if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        emergencyBanner.classList.toggle('show');
    }
});

// Add loading states
function showLoading(element, text = 'Loading...') {
    element.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <div class="loading"></div>
            <span>${text}</span>
        </div>
    `;
}

// Enhanced Quiz with Progress Animation
function updateProgressWithAnimation() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressFill.style.transition = 'width 0.5s ease';
    progressFill.style.width = `${progress}%`;
    
    // Add pulse animation to progress bar
    progressFill.style.animation = 'pulse 0.5s ease';
    setTimeout(() => {
        progressFill.style.animation = '';
    }, 500);
}

// Replace the original updateProgress function
const originalUpdateProgress = updateProgress;
updateProgress = updateProgressWithAnimation;

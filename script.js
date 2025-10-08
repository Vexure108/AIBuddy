// Mobile Navigation
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Active navigation link update
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Chat Interface Functionality
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

// Free AI proxy URL (no API key needed)
const FREE_AI_PROXY = 'https://api.openai-proxy.org/v1/chat/completions';

// Smart fallback responses
const smartResponses = {
    greetings: [
        "Hello! I'm VexAI, an advanced neural interface system. How may I assist you today?",
        "Greetings. I am online and ready to process your queries.",
        "Hello there. I'm here to provide intelligent assistance and information."
    ],
    capabilities: [
        "I can process natural language, analyze data patterns, and provide intelligent responses across various domains.",
        "My capabilities include real-time cognitive processing, multi-language support, and enterprise-grade security protocols.",
        "As an advanced AI system, I can assist with information processing, problem-solving, and intelligent automation tasks."
    ],
    technology: [
        "VexAI utilizes proprietary neural networks and advanced machine learning algorithms for cognitive processing.",
        "Our technology stack includes custom-built neural architectures optimized for real-time intelligence and pattern recognition.",
        "The system leverages cutting-edge AI research combined with enterprise-grade security and reliability measures."
    ],
    default: [
        "I understand your query. As an AI interface, I'm designed to process information and provide intelligent responses.",
        "That's an interesting point. I'm processing your input through our neural architecture.",
        "I've analyzed your message. Let me provide you with a comprehensive response based on our cognitive processing."
    ]
};

function getSmartResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return smartResponses.greetings[Math.floor(Math.random() * smartResponses.greetings.length)];
    }
    if (lowerMessage.includes('what can you do') || lowerMessage.includes('capabilities') || lowerMessage.includes('features')) {
        return smartResponses.capabilities[Math.floor(Math.random() * smartResponses.capabilities.length)];
    }
    if (lowerMessage.includes('how do you work') || lowerMessage.includes('technology') || lowerMessage.includes('neural')) {
        return smartResponses.technology[Math.floor(Math.random() * smartResponses.technology.length)];
    }
    if (lowerMessage.includes('vexai') || lowerMessage.includes('your company') || lowerMessage.includes('business')) {
        return "VexAI Technologies specializes in advanced neural interface systems and enterprise AI solutions. We provide cutting-edge artificial intelligence technology for modern business challenges.";
    }
    
    return smartResponses.default[Math.floor(Math.random() * smartResponses.default.length)];
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Add user message to chat
    addMessage(message, 'user');
    userInput.value = '';
    sendButton.disabled = true;

    try {
        // Try free AI proxy first
        const response = await fetch(FREE_AI_PROXY, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are VexAI, an advanced neural interface system. Provide professional, intelligent responses. Keep responses under 100 words and sound like an enterprise AI system."
                    },
                    {
                        role: "user",
                        content: message
                    }
                ],
                max_tokens: 150
            })
        });

        if (response.ok) {
            const data = await response.json();
            if (data.choices && data.choices[0] && data.choices[0].message) {
                const botResponse = data.choices[0].message.content;
                addMessage(botResponse, 'bot');
            } else {
                throw new Error('Invalid response format');
            }
        } else {
            throw new Error('API request failed');
        }
    } catch (error) {
        // Fallback to smart responses
        console.log('Using fallback response:', error.message);
        const fallbackResponse = getSmartResponse(message);
        addMessage(fallbackResponse, 'bot');
    }

    sendButton.disabled = false;
    userInput.focus();
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = `<p>${text}</p>`;
    
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Event listeners for chat
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Form submission
document.getElementById('enterpriseForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your enterprise inquiry. Our solutions team will contact you shortly.');
    e.target.reset();
});

// Capability showcase animation
const capabilityItems = document.querySelectorAll('.capability-item');
let currentCapability = 0;

function rotateCapabilities() {
    capabilityItems.forEach(item => item.classList.remove('active'));
    capabilityItems[currentCapability].classList.add('active');
    currentCapability = (currentCapability + 1) % capabilityItems.length;
}

// Start capability rotation
setInterval(rotateCapabilities, 3000);

// Initialize first capability as active
capabilityItems[0].classList.add('active');

// Add some sample conversation starters
setTimeout(() => {
    addMessage("I am equipped with advanced neural processing capabilities. You can ask me about technology, business intelligence, or how AI can transform enterprise operations.", 'bot');
}, 2000);

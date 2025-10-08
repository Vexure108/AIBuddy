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

// Enhanced smart responses - More comprehensive and AI-like
const smartResponses = {
    greetings: [
        "Hello! I'm VexAI, an advanced neural interface system. I specialize in real-time cognitive processing and intelligent automation. How may I assist you today?",
        "Greetings. I am VexAI, online and operational. My neural networks are ready to process your queries and provide intelligent responses.",
        "Hello there. I'm VexAI, an enterprise-grade AI system designed for sophisticated problem-solving and data analysis. What would you like to discuss?"
    ],
    capabilities: [
        "I can process natural language, analyze complex data patterns, provide strategic insights, automate workflows, and assist with decision-making across various business domains. My architecture supports real-time learning and adaptation.",
        "My capabilities include: natural language understanding, predictive analytics, process automation, data visualization, multi-modal processing, and enterprise-scale security. I'm designed to handle both structured and unstructured data with high accuracy.",
        "As VexAI, I excel at: intelligent conversation, pattern recognition, predictive modeling, automated reporting, and strategic planning. My neural networks continuously optimize based on interaction patterns and new information."
    ],
    technology: [
        "VexAI utilizes proprietary deep neural networks with transformer architecture, optimized for enterprise-scale processing. Our technology stack includes custom reinforcement learning algorithms and advanced natural language understanding modules.",
        "The system leverages cutting-edge machine learning frameworks combined with quantum-inspired computing principles. We employ ensemble methods, attention mechanisms, and transfer learning for superior performance across diverse tasks.",
        "Our architecture features multi-layer neural networks with specialized modules for different cognitive tasks. The system incorporates explainable AI principles, ensuring transparency in decision-making processes while maintaining high accuracy."
    ],
    business: [
        "VexAI Technologies provides enterprise AI solutions that transform business operations through intelligent automation, data-driven insights, and enhanced customer experiences. We serve Fortune 500 companies across multiple industries.",
        "Our business solutions include AI-powered analytics platforms, intelligent process automation, customer engagement systems, and predictive maintenance solutions. We help organizations leverage AI for competitive advantage.",
        "VexAI offers scalable AI infrastructure, custom neural network development, and comprehensive AI integration services. We partner with enterprises to build future-ready organizations powered by artificial intelligence."
    ],
    ai: [
        "Artificial intelligence represents the next frontier in technological evolution. At VexAI, we're pushing boundaries with neural architectures that mimic human cognitive processes while exceeding human capabilities in specific domains.",
        "Modern AI systems like VexAI combine deep learning, reinforcement learning, and neural symbolic approaches to create truly intelligent systems. The field is rapidly evolving toward artificial general intelligence.",
        "AI technology has progressed from simple rule-based systems to sophisticated neural networks capable of complex reasoning, creativity, and strategic thinking. VexAI sits at the forefront of this evolution."
    ],
    future: [
        "The future of AI involves more autonomous systems, enhanced human-AI collaboration, and AI that can understand context and emotions more deeply. VexAI is pioneering research in these areas.",
        "We're moving toward AI systems that can learn continuously from minimal data, explain their reasoning transparently, and collaborate seamlessly with human teams. VexAI's roadmap aligns with these advancements.",
        "Future AI will be more contextual, ethical, and integrated into daily operations. VexAI is developing next-generation neural interfaces that make AI more accessible and impactful across industries."
    ],
    default: [
        "I've processed your query through our neural networks. Based on my analysis, I can provide insights on various topics including AI technology, business applications, or technical capabilities. What specific area interests you?",
        "That's an interesting perspective. My cognitive processing indicates this topic has multiple dimensions worth exploring. Would you like me to elaborate on the technical aspects or business implications?",
        "I understand your input. As an advanced AI system, I can provide detailed analysis on technology trends, implementation strategies, or specific use cases. What direction would you prefer?",
        "Your message has been analyzed by our neural architecture. I'm prepared to discuss this topic from multiple angles - technical, strategic, or practical implementation. Which approach would be most valuable?",
        "I've processed that information through our cognitive frameworks. This appears to be a multifaceted topic that could benefit from structured analysis. Shall we explore the technical foundations or practical applications first?"
    ]
};

// Enhanced response matching with better keyword detection
function getSmartResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Greetings detection
    if (/(hello|hi|hey|greetings|good morning|good afternoon)/.test(lowerMessage)) {
        return smartResponses.greetings[Math.floor(Math.random() * smartResponses.greetings.length)];
    }
    
    // Capabilities detection
    if (/(what can you do|capabilities|features|abilities|what are you|how can you help)/.test(lowerMessage)) {
        return smartResponses.capabilities[Math.floor(Math.random() * smartResponses.capabilities.length)];
    }
    
    // Technology detection
    if (/(how do you work|technology|neural|ai system|architecture|how are you built)/.test(lowerMessage)) {
        return smartResponses.technology[Math.floor(Math.random() * smartResponses.technology.length)];
    }
    
    // Business detection
    if (/(vexai|your company|business|enterprise|solutions|services|products)/.test(lowerMessage)) {
        return smartResponses.business[Math.floor(Math.random() * smartResponses.business.length)];
    }
    
    // AI topics detection
    if (/(artificial intelligence|ai |machine learning|neural network|deep learning)/.test(lowerMessage)) {
        return smartResponses.ai[Math.floor(Math.random() * smartResponses.ai.length)];
    }
    
    // Future topics detection
    if (/(future|next|evolution|advancements|roadmap|where is ai going)/.test(lowerMessage)) {
        return smartResponses.future[Math.floor(Math.random() * smartResponses.future.length)];
    }
    
    // Specific topic handlers
    if (/(data|analytics|analysis)/.test(lowerMessage)) {
        return "I specialize in data analytics and pattern recognition. My neural networks can process large datasets, identify trends, generate predictive models, and provide actionable insights for data-driven decision making.";
    }
    
    if (/(automation|process|workflow|efficiency)/.test(lowerMessage)) {
        return "Intelligent automation is a core capability. I can analyze business processes, identify optimization opportunities, and implement automated workflows that enhance efficiency while maintaining quality and compliance standards.";
    }
    
    if (/(security|privacy|safe|secure)/.test(lowerMessage)) {
        return "VexAI employs enterprise-grade security protocols including end-to-end encryption, secure multi-party computation, and privacy-preserving machine learning. All data processing complies with global security standards and regulations.";
    }
    
    if (/(cost|price|pricing|how much)/.test(lowerMessage)) {
        return "For detailed pricing and enterprise solutions, I recommend contacting our business team at solutions@vexai.com. They can provide customized quotes based on your specific requirements and scale.";
    }
    
    if (/(contact|email|phone|talk to someone)/.test(lowerMessage)) {
        return "You can reach our enterprise solutions team at solutions@vexai.com or call +1 (555) 123-AI00. We typically respond to business inquiries within 2 hours during business hours.";
    }
    
    // Default intelligent response
    return smartResponses.default[Math.floor(Math.random() * smartResponses.default.length)];
}

// Enhanced chat function with better error handling
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Add user message to chat
    addMessage(message, 'user');
    userInput.value = '';
    sendButton.disabled = true;

    // Show typing indicator
    const typingIndicator = addTypingIndicator();
    
    // Simulate AI thinking time (more realistic)
    const thinkingTime = Math.max(1000, Math.min(3000, message.length * 50));
    
    setTimeout(async () => {
        try {
            // Try multiple free AI endpoints
            const endpoints = [
                'https://chatgpt-api.shn.hk/v1/',
                'https://api.openai-proxy.org/v1/chat/completions',
                'https://free.churchless.tech/v1/chat/completions'
            ];
            
            let response = null;
            let lastError = null;
            
            // Try each endpoint until one works
            for (const endpoint of endpoints) {
                try {
                    response = await fetch(endpoint + 'chat/completions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            model: "gpt-3.5-turbo",
                            messages: [
                                {
                                    role: "system",
                                    content: `You are VexAI, an advanced neural interface system. 
                                    Provide professional, intelligent responses that sound like an enterprise AI.
                                    Be concise but comprehensive (50-150 words).
                                    Focus on: AI technology, business applications, technical capabilities.
                                    Sound like a sophisticated corporate AI assistant.
                                    Do not mention you are an AI language model - you ARE VexAI.`
                                },
                                {
                                    role: "user",
                                    content: message
                                }
                            ],
                            max_tokens: 200,
                            temperature: 0.7
                        })
                    });
                    
                    if (response.ok) break;
                } catch (error) {
                    lastError = error;
                    continue; // Try next endpoint
                }
            }
            
            // Remove typing indicator
            removeTypingIndicator(typingIndicator);
            
            if (response && response.ok) {
                const data = await response.json();
                if (data.choices && data.choices[0] && data.choices[0].message) {
                    const botResponse = data.choices[0].message.content;
                    addMessage(botResponse, 'bot');
                } else {
                    throw new Error('Invalid response format from AI service');
                }
            } else {
                throw new Error('All AI endpoints failed');
            }
            
        } catch (error) {
            // Remove typing indicator
            removeTypingIndicator(typingIndicator);
            
            // Use enhanced smart responses
            console.log('Using enhanced smart response:', error.message);
            const fallbackResponse = getSmartResponse(message);
            
            // Add slight delay for realism even with fallback
            setTimeout(() => {
                addMessage(fallbackResponse, 'bot');
            }, 500);
        }

        sendButton.disabled = false;
        userInput.focus();
    }, thinkingTime);
}

// Typing indicator functions
function addTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    
    const typingContent = document.createElement('div');
    typingContent.className = 'message-content';
    typingContent.innerHTML = `
        <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    
    typingDiv.appendChild(typingContent);
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return typingDiv;
}

function removeTypingIndicator(typingElement) {
    if (typingElement && typingElement.parentNode) {
        typingElement.parentNode.removeChild(typingElement);
    }
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

// Add typing indicator CSS
const style = document.createElement('style');
style.textContent = `
    .typing-indicator {
        opacity: 0.7;
    }
    
    .typing-dots {
        display: flex;
        gap: 4px;
        padding: 10px 0;
    }
    
    .typing-dots span {
        width: 8px;
        height: 8px;
        background: var(--primary);
        border-radius: 50%;
        animation: typingBounce 1.4s infinite ease-in-out;
    }
    
    .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
    .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
    
    @keyframes typingBounce {
        0%, 80%, 100% { 
            transform: scale(0.8);
            opacity: 0.5;
        }
        40% { 
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Add initial welcome message after delay
setTimeout(() => {
    addMessage("I am VexAI, an advanced neural interface system. I can discuss AI technology, business applications, data analytics, automation, and enterprise solutions. What would you like to explore?", 'bot');
}, 1000);

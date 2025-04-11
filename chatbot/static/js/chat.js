let questionIndex = 0;
const questions = [
    "What is your full name?",
    "What is your gender? (Male/Female/Other)",
    "What is your age?",
    "What is your address?",
    "What is your email address?",
    "What is your contact number?"
];
const answers = [];
let appointmentBooked = false;

function showNextQuestion() {
    if (questionIndex < questions.length) {
        addMessage(questions[questionIndex], 'bot');
    } else {
        showOptions();
    }
}

function addMessage(text, sender) {
    try {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        const chatDiv = document.getElementById("chat");
        if (chatDiv) {
            chatDiv.appendChild(messageDiv);
            chatDiv.scrollTop = chatDiv.scrollHeight;
        } else {
            console.error("Chat container not found");
        }
    } catch (error) {
        console.error("Error adding message:", error);
    }
}

function showOptions() {
    try {
        const optionsDiv = document.getElementById('options');
        if (optionsDiv) {
            optionsDiv.style.display = 'block';
            addMessage("How can I help you today?", 'bot');
        } else {
            console.error("Options container not found");
        }
    } catch (error) {
        console.error("Error showing options:", error);
    }
}

function selectOption(option) {
    try {
        if (option === 'appointment') {
            // Check if appointment is already booked
            if (appointmentBooked) {
                addMessage("You have already booked an appointment in this session.", 'bot');
                return;
            }

            // Check if we have all required answers
            if (answers.length < 6) {
                addMessage("Please complete all the questions before booking an appointment.", 'bot');
                return;
            }

            addMessage("You selected: Book Appointment", 'user');
            // Generate random appointment number
            const appointmentNumber = Math.floor(100000 + Math.random() * 900000);
            
            // Send appointment data to backend
            fetch("/book-appointment", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    answers: answers,
                    type: 'appointment',
                    appointmentNumber: appointmentNumber
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'success') {
                    appointmentBooked = true;
                    addMessage(`Your appointment has been booked successfully! Your appointment number is: ${appointmentNumber}`, 'bot');
                    addMessage("Please save this number for future reference.", 'bot');
                    
                    // Disable the appointment button
                    const appointmentBtn = document.querySelector('button[onclick="selectOption(\'appointment\')"]');
                    if (appointmentBtn) {
                        appointmentBtn.disabled = true;
                        appointmentBtn.textContent = "Appointment Already Booked";
                        appointmentBtn.style.opacity = "0.5";
                    }
                } else {
                    addMessage("Sorry, there was an error booking your appointment. Please try again.", 'bot');
                }
            })
            .catch(error => {
                console.error("Error booking appointment:", error);
                addMessage("Sorry, there was an error booking your appointment. Please try again.", 'bot');
            });
        } else if (option === 'disease') {
            addMessage("You selected: Find Disease Mentally", 'user');
            // Redirect to disease finder page
            window.location.href = '/disease';
        }
    } catch (error) {
        console.error("Error selecting option:", error);
        addMessage("Sorry, there was an error processing your request. Please try again.", 'bot');
    }
}

function sendMessage() {
    try {
        const input = document.getElementById("userInput");
        if (!input) {
            console.error("Input field not found");
            return;
        }
        
        const message = input.value.trim();
        
        if (message) {
            addMessage(message, 'user');
            answers.push(message);
            input.value = "";
            questionIndex++;
            showNextQuestion();
        }
    } catch (error) {
        console.error("Error sending message:", error);
    }
}

// Allow Enter key to send message
document.addEventListener('DOMContentLoaded', function() {
    try {
        const input = document.getElementById("userInput");
        if (input) {
            input.addEventListener("keypress", function(e) {
                if (e.key === "Enter") {
                    sendMessage();
                }
            });
        }
        
        // Start the chat
        showNextQuestion();
    } catch (error) {
        console.error("Error initializing chat:", error);
    }
}); 
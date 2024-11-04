// Create and insert the bot HTML structure dynamically

function runZuvany(API){
    document.body.insertAdjacentHTML('beforeend', `
        <div class="botContiner">
            <div class="botTop">
                <p class="title">Alex AI</p>
            </div>
            <div class="ResponseContiner">
                <div class="welcomeDiv" id="welcomeDiv">
                    <p class="Welcome">Welcome To Alex AI</p>
                    <p class="About">How can I assist you today?</p>
                    <div class="questionDiv">
                        <div class="question">What is Appoim?</div>
                        <div class="question">How to Create Profile?</div>
                    </div>
                </div>
                <div class="responseDiv" id="responseDiv">
                    <!-- Responses will be appended here -->
                </div>
            </div>
            <div class="inputContiner">
                <div class="inputDiv">
                    <input type="text" id="userInput" placeholder="Enter Your Question">
                    <button class="submitBtn">Send</button>
                </div>
                <div class="logo">
                    <p>Powered by Zuvany</p>
                </div>
            </div>
        </div>
    `);
    
    // Add CSS styling directly using JavaScript
    const style = document.createElement("style");
    style.textContent = `
        * {
            padding: 0;
            box-sizing: border-box;
            margin: 0;
        }
        .botContiner {
            font-family: sans-serif;
            position: fixed;
            right: 20px;
            bottom: 20px;
            border-radius: 10px;
            width: 26%;
            height: 80vh;
            overflow: hidden;
            border: #ececec solid 2px;
        }
        .botContiner .botTop {
            width: 100%;
            height: 12vh;
            background: #ffffff;
            display: flex;
            align-items: center;
            padding-left: 20px;
            border-bottom: #ececec solid 2px;
        }
        .botTop .title {
            font-size: 2rem;
        }
        .ResponseContiner, .responseDiv {
            width: 100%;
            height: 56vh;
            padding: 10px;
            overflow-y: auto;
        }
        .ResponseContiner::-webkit-scrollbar {
            width: 8px;
        }
        .ResponseContiner::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 10px;
        }
        .ResponseContiner::-webkit-scrollbar-thumb:hover {
            background: #888;
        }
        .welcomeDiv {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 10px;
            padding: 5px;
        }
        .welcomeDiv .Welcome {
            font-size: 1.5rem;
        }
        .welcomeDiv .About {
            font-size: 1rem;
            text-align: center;
        }
        .welcomeDiv .questionDiv {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-top: 10px;
            gap: 10px;
        }
        .questionDiv .question {
            padding: 5px 10px;
            border-radius: 10px;
            border: #ececec solid 2px;
        }
        .responseDiv .response {
            padding: 10px 10px;
            border-radius: 5px;
            background-color: #ececec;
            margin-bottom: 10px;
        }
        .inputContiner {
            width: 100%;
            height: 12vh;
            flex-direction: column;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .inputContiner .inputDiv {
            width: 95%;
            height: 55%;
            display: flex;
        }
        .inputDiv input {
            width: 80%;
            height: 100%;
            font-size: 1.1rem;
            padding-left: 5px;
            border-radius: 10px;
            outline: none;
            border: #ececec solid 2px;
            border-start-end-radius: 0;
            border-bottom-right-radius: 0;
            border-right: 0;
        }
        .inputDiv .submitBtn {
            width: 20%;
            height: 100%;
            border: #ececec solid 2px;
            background: #fff;
            border-radius: 10px;
            border-start-start-radius: 0;
            border-bottom-left-radius: 0;
            font-size: 1.1rem;
            cursor: pointer;
        }
        .inputDiv .submitBtn:hover {
            background-color: #f0eeee;
        }
        .inputContiner .logo {
            width: 100%;
            height: 30%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 5px;
            color: #929292;
        }
        @media (max-width: 768px) {
            .botContiner {
                width: 90%;
                right: 5%;
                bottom: 5%;
                height: 75vh;
            }
            .botTop .title {
                font-size: 1.5rem;
            }
            .ResponseContiner, .responseDiv {
                height: 50vh;
            }
            .inputDiv input {
                font-size: 1rem;
            }
            .inputDiv .submitBtn {
                font-size: 1rem;
            }
        }
        @media (max-width: 480px) {
            .botContiner {
                width: 95%;
                right: 2.5%;
                bottom: 5%;
                height: 75vh;
            }
            .botTop .title {
                font-size: 2rem;
            }
            .inputDiv input, .inputDiv .submitBtn {
                font-size: 1.1rem;
            }
        }
    `;
    document.head.appendChild(style);
    
    // JavaScript code for handling send button click and responses
    document.querySelector('.submitBtn').addEventListener('click', sendMessage);
    
    const responseDiv = document.getElementById("responseDiv");
    const welcomeDiv = document.getElementById("welcomeDiv");
    
    function sendMessage() {
        if(!API){
            alert("Add Your API Key")
            return
        }
        const userInput = document.getElementById("userInput").value;
        if (userInput.trim() === "") {
            alert("Please enter a question.");
            return;
        }
        displayMessage(userInput, "user");
    
        fetch("https://example.com/api/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: userInput })
        })
        .then(response => response.json())
        .then(data => displayMessage(data.answer, "bot"))
        .catch(error => {
            console.error("Error:", error);
            displayMessage("There was an error processing your request."+API, "bot");
        });
    
        document.getElementById("userInput").value = "";
    }
    
    function displayMessage(message, sender) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("response");
    
        messageElement.style.backgroundColor = sender === "user" ? "#d4f0ff" : "#ececec";
        messageElement.textContent = message;
    
        responseDiv.appendChild(messageElement);
        welcomeDiv.style.display = "none";
        responseDiv.scrollTop = responseDiv.scrollHeight;
    }
    
}


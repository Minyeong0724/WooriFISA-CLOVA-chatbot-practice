const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chatBody = document.querySelector('.chat-box-body');
let isSend=false;
sendBtn.addEventListener('click', () => {
    duplication();
});
document.addEventListener('keydown', function(event) {
    if(event.keyCode === 13){
        duplication();
    }
});
async function duplication(){
    //중복처리
    if(isSend) return;
    const text = userInput.value.trim();;
    //메세지 없을 시 처리
    if(!text) return;
    try{
        isSend=true;
        //버튼 잠금
        sendBtn.disabled=true;
        setMyChat(text);
        userInput.value = '';
        // botMessage.textContent = "답변을 생성중입니다. 잠시만 기다려 주십시오.";
        setLoadingMessage();
        const responseMessage = await sendMessage("/sendChat",text);
        setResponseChat(responseMessage);
    }
    catch(e){
        console.error(e);
        alert("메세지 전송 실패");
    }
    finally{
        isSend=false;
        sendBtn.disabled=false;
    }
}
function setMyChat(text){
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user');
    userMessage.textContent = text;
    chatBody.appendChild(userMessage);
}
function setResponseChat(responseMessage){
    const botMessage = document.createElement('div');
    const element = document.getElementById('temp');
    // 3. 요소가 존재하면 (null이 아니면) 삭제합니다.
    if (element) {
        element.remove();
    }
    // const botMessage = document.getElementsByClassName('message bot');
    botMessage.classList.add('message', 'bot');
    botMessage.textContent = responseMessage;
    chatBody.appendChild(botMessage);
    chatBody.scrollTop = chatBody.scrollHeight;
}
function setLoadingMessage() {
    const text = "답변을 생성중입니다. 잠시만 기다려 주십시오.";
    const botMessage = document.createElement('div');
    botMessage.classList.add('message', 'bot');
    botMessage.id = "temp";
    botMessage.textContent = text;
    chatBody.appendChild(botMessage);
    chatBody.scrollTop = chatBody.scrollHeight;
}
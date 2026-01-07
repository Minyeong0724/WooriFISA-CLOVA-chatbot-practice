//서버 배포 및 클라이언트 요청수락
import {chat} from './api.js';
import express, {json} from 'express';

const app = express();
const PORT = 5000;

app.use(express.static('public'));
app.use(json());

//기본 파일 호출
app.get('/', (_, response) => response.sendFile('index.html'));


//채팅 보내기
app.post('/sendChat', async (request, response) => {
    try{
        const data = request.body;
        
        const result = await chat(data);
    
        if(result.text === 0){
            console.log("test");
            response.send("API통신 중 문제가 발생하였습니다.");
        }
    
        let resultBubbles = result.bubbles;
        const text = resultBubbles[0].data.description;
        setTimeout(() => {
            response.send(text)
        },3000)
    }catch(e){
        console.error(e);
        response.send("API통신 중 문제가 발생하였습니다.")
    }
});

app.listen(PORT, () => console.log(`Express 서버가 http://localhost:${PORT} 에서 대기중`));

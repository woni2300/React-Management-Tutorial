const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// 미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 날짜별 이미지 폴더 제공 (형식: 20241127)
app.use('/image/:date', (req, res, next) => {
    const { date } = req.params;  // 요청된 날짜 (예: '20241127')
    
    // 날짜 형식이 맞는지 확인 (yyyyMMdd 형식)
    const dateRegex = /^\d{8}$/;
    if (!dateRegex.test(date)) {
        return res.status(400).send('Invalid date format. Please use yyyyMMdd.');
    }

    const imagePath = path.join(__dirname, 'upload', date);  // 예: ./upload/20241127

    // 해당 날짜 폴더가 존재하는지 확인
    fs.stat(imagePath, (err, stats) => {
        if (err || !stats.isDirectory()) {
            return res.status(404).send('Date folder not found');
        }
        // 존재하면 해당 폴더를 static으로 제공
        express.static(imagePath)(req, res, next);
    });
});


// 고객 관련 라우트
const customersRoute = require('./routes/customers/customers');
app.use('/api/customers', customersRoute);

// 고객 관련 라우트
const userRoute = require('./routes/user/user');
app.use('/api/users', userRoute);


// 서버 시작
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

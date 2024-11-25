const express = require('express'); // Express 프레임워크 로드
const bodyParser = require('body-parser'); // HTTP 요청 바디를 파싱하기 위한 미들웨어 로드
const app = express(); // Express 애플리케이션 인스턴스 생성
const port = process.env.PORT || 5000; // 서버 포트 설정 (기본: 5000)

// Body-parser 미들웨어 설정
app.use(bodyParser.json()); // JSON 형태의 요청 바디를 파싱
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 형태의 요청 바디를 파싱

// 데이터베이스 설정 로드
const fs = require('fs'); // 파일 시스템 모듈 로드
const data = fs.readFileSync('./database.json'); // database.json 파일 읽기
const conf = JSON.parse(data); // JSON 파싱
const mysql = require('mysql'); // MySQL 모듈 로드

// MySQL 데이터베이스 연결 설정
const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

// MySQL 데이터베이스 연결
connection.connect();

// 파일 업로드를 처리하기 위한 Multer 설정
const multer = require('multer');
const upload = multer({ dest: './upload' }); // 업로드된 파일이 저장될 디렉토리 지정

// 고객 데이터 조회 API
app.get('/api/customers', (req, res) => {
    console.log('Fetching customer data...'); // 요청 로그
    connection.query(
        "SELECT * FROM CUSTOMER where isDeleted =0", // 고객 테이블에서 모든 데이터 조회
        (err, rows, fields) => {
            if (err) {
                console.error('Database query error:', err); // 오류 로그
                return res.status(500).send('Error while fetching customer data');
            }
            res.send(rows); // 조회된 데이터 반환
        }
    );
});

// 업로드된 이미지 파일을 제공하기 위한 정적 경로 설정
app.use('/image', express.static('./upload'));

// 고객 추가 API
app.post('/api/customerAdd', upload.single('image'), (req, res) => {
    console.log('Fetching customersAdd data...'); // 요청 로그

    // 파일 업로드 여부 확인
    if (!req.file) {
        return res.status(400).send('No file uploaded.'); // 파일이 없으면 400 에러 반환
    }

    // 데이터베이스에 삽입할 SQL 및 값 설정
    let sql = 'INSERT INTO CUSTOMER (image, name, birthDay, gender, job, createDate , isDeleted) VALUES (?, ?, ?, ?, ?, now(), 0 );';
    let image = '/image/' + req.file.filename; // 업로드된 이미지 경로
    let name = req.body.name; // 요청 바디에서 이름
    let birthday = req.body.birthday; // 요청 바디에서 생일
    let gender = req.body.gender; // 요청 바디에서 성별
    let job = req.body.job; // 요청 바디에서 직업

    // 필수 필드 검증
    if (!name || !birthday || !gender || !job) {
        return res.status(400).send('Missing required fields'); // 필드 누락 시 400 에러 반환
    }

    // SQL 실행 및 결과 처리
    let params = [image, name, birthday, gender, job];
    connection.query(sql, params, (err, rows, fields) => {
        if (err) {
            console.error('Database query error:', err); // 오류 로그
            return res.status(500).send('Error while inserting data into database'); // 데이터 삽입 실패 시 500 에러 반환
        }
        res.status(201).send(rows); // 데이터 삽입 성공 시 응답 반환
    });
});


// 고객 수정 API
app.post('/api/customerModify', upload.single('image'), (req, res) => {
    console.log('Fetching customersModify data...'); // 요청 로그
    let sql = 'INSERT INTO CUSTOMER (image, name, birthDay, gender, job, createDate , isDeleted) VALUES (?, ?, ?, ?, ?, now(), 0 );';
    let params = [];
    // 파일 업로드 여부 확인
    if (!req.file) {
        // 데이터베이스에 삽입할 SQL 및 값 설정
        sql = 'UPDATE CUSTOMER SET name=?, birthDay=?, gender=?, job=? WHERE ID=?;';
        let name = req.body.name; // 요청 바디에서 이름
        let birthday = req.body.birthday; // 요청 바디에서 생일
        let gender = req.body.gender; // 요청 바디에서 성별
        let job = req.body.job; // 요청 바디에서 직업
        let id = req.body.id;
        params = [name, birthday, gender, job, id];
    } else {

        // 데이터베이스에 삽입할 SQL 및 값 설정
        sql = 'UPDATE CUSTOMER SET image=?, name=?, birthDay=?, gender=?, job=? WHERE ID=?;';
        let image = '/image/' + req.file.filename; // 업로드된 이미지 경로
        let name = req.body.name; // 요청 바디에서 이름
        let birthday = req.body.birthday; // 요청 바디에서 생일
        let gender = req.body.gender; // 요청 바디에서 성별
        let job = req.body.job; // 요청 바디에서 직업
        let id = req.body.id;
        params = [image, name, birthday, gender, job, id];
    }
    console.log(params);

    // SQL 실행 및 결과 처리
    connection.query(sql, params, (err, rows, fields) => {
        if (err) {
            console.error('Database query error:', err); // 오류 로그
            return res.status(500).send('Error while inserting data into database'); // 데이터 삽입 실패 시 500 에러 반환
        }
        res.status(201).send(rows); // 데이터 삽입 성공 시 응답 반환
    });
});


app.delete('/api/customers/:id', (req, res) => {
    let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id= ?';
    let params = [req.params.id];
    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
    })
})

// 서버 시작
app.listen(port, () => console.log(`Listening on port ${port}`)); // 지정된 포트에서 서버 실행

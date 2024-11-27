// routes/customers.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { connectToDB, sql } = require('../../db/db');

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const mkdirp = promisify(require('mkdirp')); // mkdirp를 사용하여 디렉토리 생성

// 업로드된 파일을 저장할 폴더를 날짜별로 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const today = new Date();
        const dateFolder = today.toISOString().slice(0, 10).replace(/-/g, ''); // 'yyyyMMdd' 형식으로 날짜 계산
        const uploadDir = path.join(__dirname, '../../upload', dateFolder);

        // 날짜별 폴더가 없다면 폴더 생성
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);  // 해당 폴더로 저장
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // 파일명에 timestamp를 붙여 고유하게 저장
    }
});


// multer 업로드 설정
const upload = multer({ storage: storage });

// 고객 데이터 조회 API
router.get('/', async (req, res) => {
    console.log('Fetching customer data...');
    try {
        const pool = await connectToDB();
        const result = await pool.request().query('SELECT * FROM CUSTOMER WHERE isDeleted = 0');
        res.send(result.recordset); // 결과 반환
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send('Error while fetching customer data');
    }
});

// 고객 추가 API
router.post('/add', upload.single('image'), async (req, res) => {
    console.log('Fetching customersAdd data...');
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        // 업로드된 이미지의 경로를 날짜별로 제공
        const today = new Date();
        const dateFolder = today.toISOString().slice(0, 10).replace(/-/g, ''); // 'yyyyMMdd' 형식으로 날짜 계산
        const uploadDir = path.join(__dirname, '../../upload', dateFolder);

        // 폴더가 없다면 생성
        await mkdirp(uploadDir);
        // 권한 설정: 폴더가 생성되면 권한을 755로 설정
        fs.chmodSync(uploadDir, '755');

        const image = `/image/${dateFolder}/${req.file.filename}`;  // 날짜별 폴더에 업로드된 파일 경로

        const { name, birthday, gender, job } = req.body;

        if (!name || !birthday || !gender || !job) {
            return res.status(400).send('Missing required fields');
        }
        const pool = await connectToDB();
        const request = pool.request();
        request.input('image', sql.VarChar, image);
        request.input('name', sql.VarChar, name);
        request.input('birthday', sql.VarChar, birthday);
        request.input('gender', sql.VarChar, gender);
        request.input('job', sql.VarChar, job);

        const result = await request.query(`
            INSERT INTO CUSTOMER (image, name, birthDay, gender, job, createDate, isDeleted)
            VALUES (@image, @name, @birthday, @gender, @job, GETDATE(), 0);
        `);

        res.status(201).send(result);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send('Error while inserting data into database');
    }
});

// 고객 수정 API
router.post('/modify', upload.single('image'), async (req, res) => {

    console.log('Fetching customersModify data...');
    let query = '';
    let params = [];
    let name = '';
    let birthday = '';
    let gender = '';
    let job = '';
    let id = '';

    try {
        const pool = await connectToDB();
        const request = pool.request();

        if (!req.file) {
            query = 'UPDATE CUSTOMER SET name=@name, birthday=@birthday, gender=@gender, job=@job WHERE ID=@id;';
            name = req.body.name;
            birthday = req.body.birthday;
            gender = req.body.gender;
            job = req.body.job;
            id = req.body.id;
            params = [name, birthday, gender, job, id];
        } else {
            query = 'UPDATE CUSTOMER SET image=@image, name=@name, birthday=@birthday, gender=@gender, job=@job WHERE ID=@id;';
            // 업로드된 이미지의 경로를 날짜별로 제공
            const today = new Date();
            const dateFolder = today.toISOString().slice(0, 10).replace(/-/g, ''); // 'yyyyMMdd' 형식으로 날짜 계산
            const uploadDir = path.join(__dirname, '../../upload', dateFolder);

            // 폴더가 없다면 생성
            await mkdirp(uploadDir);
            // 권한 설정: 폴더가 생성되면 권한을 755로 설정
            fs.chmodSync(uploadDir, '755');

            const image = `/image/${dateFolder}/${req.file.filename}`;  // 날짜별 폴더에 업로드된 파일 경로

            name = req.body.name;
            birthday = req.body.birthday;
            gender = req.body.gender;
            job = req.body.job;
            id = req.body.id;
            params = [image, name, birthday, gender, job, id];
            request.input('image', sql.VarChar, image);
        }

        request.input('name', sql.VarChar, name);
        request.input('birthday', sql.VarChar, birthday);
        request.input('gender', sql.VarChar, gender);
        request.input('job', sql.VarChar, job);
        request.input('id', sql.Int, id);

        const result = await request.query(query);
        res.status(201).send(result);

    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send('Error while inserting data into database');
    }
});

// 고객 삭제 API
router.delete('/:id', async (req, res) => {

    try {
        const pool = await connectToDB();
        const id = req.params.id;
        const request = pool.request();
        request.input('id', sql.Int, id);

        const result = await request.query('UPDATE CUSTOMER SET isDeleted = 1 WHERE id = @id');
        res.send(result);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send('Error while deleting customer');
    }
});

module.exports = router;
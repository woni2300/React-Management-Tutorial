const express = require('express');
const router = express.Router();
const { connectToDB, sql } = require('../../db/db');
const multer = require('multer');
const upload = multer();

// user 로그인
router.post('/login', upload.none(),async (req, res) => {
    const { userid, password } = await req.body;
    if (!userid || !password) {
        return res.status(400).send('Missing required fields');
    }
    console.log('Fetching login data...');
    try {
        
        const pool = await connectToDB();
        const request = pool.request();
        request.input('userid', sql.VarChar, userid);
        request.input('password', sql.VarChar, password);

        const result = await request.query('SELECT * FROM USERS WHERE isDeleted = 0 and userid = @userid and password = @password');
        res.status(201).send(result);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send('Error while fetching USERS data');
    }
});

// user 가입
router.post('/signup', upload.none(),async (req, res) => {
    console.log('Fetching signUp data...');
    
    // Check for required fields
    const { userid, password } = await req.body;

    if (!userid || !password) {
        return res.status(400).send('Missing required fields');
    }

    try {
        const pool = await connectToDB();
        const request = pool.request();
        request.input('userid', sql.VarChar, userid);
        request.input('password', sql.VarChar, password);

        // Insert new user into the database
        const result = await request.query(`
            INSERT INTO USERS (userid, password, createDate, isDeleted)
            VALUES (@userid, @password, GETDATE(), 0);
        `);

        // Respond with success
        res.status(201).send(result);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send('Error while inserting data into database');
    }
});

module.exports = router;
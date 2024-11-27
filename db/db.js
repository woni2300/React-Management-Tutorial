const sql = require('mssql');
const fs = require('fs');

// DB 설정 불러오기
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);

const config = {
    user: conf.user,
    password: conf.password,
    server: conf.host,
    port: parseInt(conf.port, 10),
    database: conf.database,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};

// DB 연결을 위한 함수 생성
const connectToDB = async () => {
    try {
        return await sql.connect(config);
    } catch (error) {
        console.error('Database connection failed:', error.message);
        throw error;
    }
};

module.exports = {
    sql,
    connectToDB,
};

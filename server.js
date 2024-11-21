const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/customers',(req,res)=>{
    res.send(
        [
            {
              id: '1',
              image: 'https://dummyimage.com/64/555555/ffffff',
              name: '홍길동',
              birthDay: '961222',
              gender: '남',
              job: '대학생',
            },
            {
              id: '2',
              image: 'https://dummyimage.com/64/777777/ffffff',
              name: '홍길동1',
              birthDay: '961223',
              gender: '남',
              job: '대학생',
            },
            {
              id: '3',
              image: 'https://dummyimage.com/64/111111/ffffff',
              name: '홍길동2',
              birthDay: '961224',
              gender: '남',
              job: '대학생',
            },
            {
              id: '4',
              image: 'https://dummyimage.com/64/C4DAD2/ffffff',
              name: '홍길동2',
              birthDay: '961224',
              gender: '남',
              job: '대학생',
            },
            {
              id: '5',
              image: 'https://dummyimage.com/64/16423C/ffffff',
              name: '홍길동2',
              birthDay: '961224',
              gender: '남',
              job: '대학생',
            },
            {
              id: '6',
              image: 'https://dummyimage.com/64/E9EFEC/16423C',
              name: '홍길동2',
              birthDay: '961224',
              gender: '남',
              job: '대학생',
            },
          
    ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`))

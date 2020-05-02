const request = require('supertest');
const appModule = require('../app')

const app = appModule.app;

/* Tests are mostly to see if the status codes operate as desired. */
/* If some data is desired, the responses body is checkde if present. */
/* For requests as put/post/delete, the metadata of the data in question is returned */
/* and the tests check if for correctness */

/* External calls are mocked to improve efficiency*/
jest.mock('../models/messageDB')

describe('GET Endpoints', () => {
    it('GET api/message/new', async () => {
        let res = await request(app)
        .get('/api/message/new')

        expect(res.statusCode).toBe(200)
        expect(res.body).toBeTruthy();
    });

    it('GET api/message/all', async () => {
        let res = await request(app)
        .get('/api/message/all')

        expect(res.statusCode).toBe(200)
        expect(res.body).toBeTruthy();
    });

    describe('GET api/message/:id', () => {
        it('404 with incorrect id', async () => {
            let res = await request(app)
            .get('/api/message/1')
    
            expect(res.statusCode).toBe(404);
        });
    
        it('200 with correct id', async () => {
            let res = await request(app)
            .get('/api/message/welcome')
    
            expect(res.statusCode).toBe(200);
            expect(res.body).toBeTruthy();
        });
    })
})

describe('POST Endpoints', () => {
    describe('POST api/message/', () => {
        it('400 with missing values', async () => {
            let res = await request(app)
            .post('/api/message/')
            .send({
                test : 'wrong input'
            });
    
            expect(res.statusCode).toBe(400);
        });
    
        it('201 with correct input', async () => {
            let res = await request(app)
            .post('/api/message/')
            .send({ 
               author: "xx xx",
                title: "xx",
              message: "xxx",
                 date: "xx/xx/xx xx.xx.xx",
                 read: false
            });
                
            expect(res.statusCode).toBe(201);
            expect(res.ok).toBe(true)
        });
    })
});

describe('PUT Endpoints', () => {
    describe('PUT api/message/welcome', () => {
        it('400 with missing values', async () => {
            let res = await request(app)
            .put('/api/message/welcome')
            .send({
                test : 'no message key'
            });
    
            expect(res.statusCode).toBe(400);
        });
    
        it('200 with correct input', async () => {
            let res = await request(app)
            .put('/api/message/welcome')
            .send({
              message: "xxx"
            });
                
            expect(res.statusCode).toBe(200);
            expect(res.ok).toBe(true)
        });
    })
    describe('PUT api/message/read/:id', () => {
        it('400 with welcome as id', async () => {
            let res = await request(app)
            .put('/api/message/read/welcome')
    
            expect(res.statusCode).toBe(400);
        });

        it('404 with no matching id', async () => {
            let res = await request(app)
            .put('/api/message/read/4')
    
            expect(res.statusCode).toBe(404);
        });
    
        it('200 with correct input', async () => {
            let res = await request(app)
            .put('/api/message/read/1')
                
            expect(res.statusCode).toBe(200);
            expect(res.ok).toBe(true)
        });
    })
    describe('DELETE api/message/:id', () => {
        it('404 with no matching id', async () => {
            let res = await request(app)
            .delete('/api/message/4')
    
            expect(res.statusCode).toBe(404);
        });
        it('200 with correct input', async () => {
            let res = await request(app)
            .delete('/api/message/1')
                
            expect(res.statusCode).toBe(200);
            expect(res.ok).toBe(true)
        });
    })
})


afterAll(async done => {
    appModule.server.close()
    done();
});
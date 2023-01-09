import server from 'server'
import request from 'supertest'

let token
let username = 'testusername'
let nickname = 'testnickname'
let password = 'testpassword'
let phone = '12345678910'
let smsCode = '1234'

describe('routers: user', () => {
  let app
  beforeAll(async () => {
    app = await server
  })

  it('should be return 400 status code', async () => {
    const res = await request(app).post('/api/user/register').send({
      username,
      password,
      phone,
      nickname,
    })
    const parseResText = JSON.parse(res.text)
    expect(parseResText.code).toEqual(400)
  })

  it('should be return 200 status code', async () => {
    const res = await request(app).post('/api/user/register').send({
      username,
      password,
      phone,
      nickname,
      smsCode,
    })
    const parseResText = JSON.parse(res.text)
    token = parseResText.data.access_token
    expect(parseResText.code).toEqual(200)
  })

  it('should be return 400 status code', async () => {
    const res = await request(app).post('/api/user/login').send({
      username,
    })
    const parseResText = JSON.parse(res.text)
    expect(parseResText.code).toEqual(400)
  })

  it('should be return 400 status code', async () => {
    const res = await request(app).post('/api/user/login').send({
      username,
      password: username,
    })
    const parseResText = JSON.parse(res.text)
    expect(parseResText.code).toEqual(400)
  })

  it('should be return 200 status code', async () => {
    const res = await request(app).post('/api/user/login').send({
      username,
      password,
    })
    const parseResText = JSON.parse(res.text)
    token = parseResText.data.access_token
    expect(parseResText.code).toEqual(200)
  })

  it('should be return 200 status code', async () => {
    const res = await request(app)
      .get('/api/user')
      .set({
        Authorization: `Bearer ${token}`,
      })
    const parseResText = JSON.parse(res.text)
    expect(parseResText.code).toEqual(200)
  })

  it('should be return 200 status code', async () => {
    const res = await request(app)
      .put('/api/user')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        password: 'new' + password,
        phone,
        nickname,
      })
    const parseResText = JSON.parse(res.text)
    expect(parseResText.code).toEqual(200)
  })

  it('should be return 200 status code', async () => {
    const res = await request(app)
      .post('/api/user/test/delete')
      .set({
        Authorization: `Bearer ${token}`,
      })
    expect(res.status).toEqual(200)
  })

  afterAll(async done => {
    app.close()
    done()
  })
})

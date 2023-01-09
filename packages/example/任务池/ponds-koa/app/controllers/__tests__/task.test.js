import server from 'server'
import request from 'supertest'

let token
let username = 'ghgws'
let nickname = 'wu'
let password = '123456'
let phone = '18075924185'
let smsCode = '1234'

describe('routers: task', () => {
  let app
  beforeAll(async () => {
    app = await server
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

  it('should be return 200 status code', async () => {
    const res = await request(app).post('/api/user/login').send({
      username,
      password,
    })
    const parseResText = JSON.parse(res.text)
    token = parseResText.data.access_token
    expect(parseResText.code).toEqual(200)
  })

  // 测试鉴权
  it('should be return 401 status code', async () => {
    const res = await request(app).get('/api/task')
    const parseResText = JSON.parse(res.text)
    expect(parseResText.code).toEqual(401)
  })

  it('should be return 401 status code', async () => {
    const res = await request(app)
      .get('/api/task')
      .set({
        Authorization: `Beaer ${token}`,
      })
    const parseResText = JSON.parse(res.text)
    expect(parseResText.code).toEqual(401)
  })
  // Todo: token过期测试用例
  // it('should be return 401 status code', async () => {
  //   const res = await request(app).get('/api/task')
  //   const parseResText = JSON.parse(res.text)
  //   expect(parseResText.code).toEqual(401)
  // })

  it('should be return 200 status code', async () => {
    const res = await request(app)
      .get('/api/task')
      .set({
        Authorization: `Bearer ${token}`,
      })
    const parseResText = JSON.parse(res.text)
    expect(parseResText.code).toEqual(200)
  })

  it('should be return 200 status code', async () => {
    const res = await request(app)
      .post('/api/task')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        title: 'test: create a task',
        pond: 2,
      })
    const parseResText = JSON.parse(res.text)
    expect(parseResText.code).toEqual(200)
  })
  // create测试用例：失败
  it('should be return 400 status code', async () => {
    const res = await request(app)
      .post('/api/task')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        pond: 2, // 缺少title
      })
    const parseResText = JSON.parse(res.text)
    expect(parseResText.code).toEqual(400)
  })

  it('should be return 400 status code', async () => {
    const res = await request(app)
      .post('/api/task')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        title: 'test: create a task', // 缺少pond
      })
    const parseResText = JSON.parse(res.text)
    expect(parseResText.code).toEqual(400)
  })

  it('should be return 200 status code', async () => {
    const res = await request(app)
      .put('/api/task/:1')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        title: 'test: edit a task',
        importance: 2,
        urgency: 3,
      })
    const parseResText = JSON.parse(res.text)
    expect(parseResText.code).toEqual(200)
  })

  it('should be return 200 status code', async () => {
    const res = await request(app)
      .delete('/api/task/test/:1')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        title: 'test: edit a task',
        importance: 2,
        urgency: 3,
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

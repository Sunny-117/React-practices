import server from 'server'
import request from 'supertest'

let access_token
let refresh_token
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

  it('should be return 200 status code', async () => {
    const res = await request(app).post('/api/user/register').send({
      username,
      password,
      phone,
      nickname,
      smsCode,
    })
    const parseResText = JSON.parse(res.text)
    // access_token = parseResText.data.access_token
    access_token = 'fakeToken'
    refresh_token = parseResText.data.refresh_token
    expect(parseResText.code).toEqual(200)
  })

  it('should be return 401 status code', async () => {
    const res = await request(app)
      .get('/api/user')
      .set({
        Authorization: `Bearer ${access_token}`,
      })
    const parseResText = JSON.parse(res.text)
    expect(parseResText.code).toEqual(401)
  })

  it('should be return 401 status code', async () => {
    const res = await request(app).post('/api/token/refresh').send({
      refresh_token: 'fake_refresh_token',
    })
    const parseResText = JSON.parse(res.text)
    expect(parseResText.code).toEqual(401)
  })

  it('should be return 200 status code', async () => {
    const res = await request(app).post('/api/token/refresh').send({
      refresh_token,
    })
    const parseResText = JSON.parse(res.text)
    access_token = parseResText.data.access_token
    refresh_token = parseResText.data.refresh_token
    expect(res.status).toEqual(200)
  })

  it('should be return 200 status code', async () => {
    const res = await request(app)
      .get('/api/user')
      .set({
        Authorization: `Bearer ${access_token}`,
      })
    const parseResText = JSON.parse(res.text)
    expect(parseResText.code).toEqual(200)
  })

  it('should be return 200 status code', async () => {
    const res = await request(app)
      .post('/api/user/test/delete')
      .set({
        Authorization: `Bearer ${access_token}`,
      })
    expect(res.status).toEqual(200)
  })

  afterAll(async done => {
    app.close()
    done()
  })
})

import request from 'supertest'
import app from '../src/app';

describe('Products API', () => {
  it('should create a new account, recieve a JWT token and refresh the refresh token', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({
        email: "test123@test43212.com",
        firstName: "Test FirstName",
        lastName: "Last Name",
        password: "dolphinElephant",
        role: "ADMIN"
      });
      expect(response.status).toBe(201);

      const { refreshToken } = response.body;
      const responseRefreshToken = await request(app)
      .post('/auth/refreshToken')
      .send({
        refreshToken
      });
      expect(responseRefreshToken.status).toBe(200);
  });
});

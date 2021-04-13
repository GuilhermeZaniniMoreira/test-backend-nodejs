import request from 'supertest'
import app from '../src/app';

describe('Products API', () => {
  it('should create a new product and return http status code 200', async () => {
    const response = await request(app)
      .post('/product')
      .send({
        title: 'Title product test',
        description: 'Product description test',
        price: 129.45,
        categoryId: '6075d9b93b76d23d6029a148',
      });
      expect(response.status).toBe(200)
  });

  it('should return an array of products and http status code 200', async () => {
    const response = await request(app)
      .get('/product');
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.status).toBe(200);
  });
});

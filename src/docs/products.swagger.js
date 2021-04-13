export default {
  paths: {
    '/products': {
      post: {
        tags: ['Products'],
        description: 'Create new product',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string', required: true },
                  description: { type: 'string', required: true },
                  categoryId: { type: 'string', required: true },
                  price: { type: 'number', required: true }
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Products'],
        description: 'Update product',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  _id: { type: 'string', required: true },
                  title: { type: 'string', required: true },
                  description: { type: 'string', required: true },
                  categoryId: { type: 'string', required: true },
                  price: { type: 'number', required: true }
                },
              },
            },
          },
        },
      },
      get: {
        tags: ['Products'],
        description: 'Get products',
        parameters: [
          {
            name: 'skip',
            in: 'query',
            type: 'string',
            description: 'Pagination - skip',
          },
          {
            name: 'limit',
            in: 'query',
            type: 'string',
            description: 'Pagination - limit',
          },
          {
            name: 'name',
            in: 'query',
            type: 'string',
            description: 'Product name',
          },
          {
            name: 'categoryId',
            in: 'query',
            type: 'string',
            description: 'Category id',
          },
        ],
      },
      delete: {
        tags: ['Products'],
        description: 'Get products',
        parameters: [
          {
            name: 'id',
            in: 'query',
            type: 'string',
            description: 'Product id',
          },
        ],
      },
    },
  },
};

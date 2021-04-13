export default {
  paths: {
    '/category': {
      post: {
        tags: ['Category'],
        description: 'Create new category',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string', required: true },
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Category'],
        description: 'Update product',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  _id: { type: 'string', required: true },
                  title: { type: 'string', required: true },
                },
              },
            },
          },
        },
      },
      get: {
        tags: ['Category'],
        description: 'Get Category',
      },
      delete: {
        tags: ['Category'],
        description: 'Get Category',
        parameters: [
          {
            name: 'id',
            in: 'query',
            type: 'string',
            description: 'Categpry id',
          },
        ],
      },
    },
  },
};

export default {
  paths: {
    '/auth/signup': {
      post: {
        tags: ['Auth'],
        description: 'SignUp',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', required: true },
                  firstName: { type: 'string', required: true },
                  lastName: { type: 'string', required: true },
                  password: { type: 'string', required: true }
                },
              },
            },
          },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        description: 'LogIn',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', required: true },
                  password: { type: 'string', required: true }
                },
              },
            },
          },
        },
      },
    },
    '/auth/refreshToken': {
      post: {
        tags: ['Auth'],
        description: 'Get new refresh token',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  refreshToken: { type: 'string', required: true }
                },
              },
            },
          },
        },
      },
    },
    '/auth/logout': {
      post: {
        tags: ['Auth'],
        description: 'LogOut',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  refreshToken: { type: 'string', required: true }
                },
              },
            },
          },
        },
      },
    }
  },
};

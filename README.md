Download or Git Clone the project.

To install all the Node modules use NPM or Yarn.

`bash
yarn
`
or

`bash
npm install
`

Create a .env file or rename .env.example to .env. Add your Mongo URI and create an access token secret or refresh token secret.

The access token e refresh token are being used for authentication using JWT.

<strong>Running the project</strong>

- Using `dev` script - using nodemon.

`bash
yarn dev
`
or

`bash
npm run dev
`

- Using `start` script.

`bash
yarn start
`

`bash
npm run start
`

<strong>Documentation</strong>

After running the project, you can access http://localhost:3333/api-docs to see the documentantion and test the routes.

Product and Category routes are not using the authentication middleware, in order to use it you can uncomment the lines using the middleware in index.js file inside routes in each module. To use protected routes with Swagger it's necessary to generate the JWT token and add it using the Authorize button.


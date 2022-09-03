This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

This project includes the view and API apps for Covid 19 today. An app created during the beginning of Covid in 2020.

## For the view
#### The project runs with node 14 and the following commands are available:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## For the API:

The code is inside the folder functions and creates an app with Express to be served in firebase. There is no need to build the project, but if you want to run it you can sue the following command from root:

### `firebase serve --only functions`

### Deployment

To deploy the project use firebase, first build the view using `yarn build` and then you can deploy using any of these:

- `firebase deploy --only hosting`
- `firebase deploy --only functions`
- `firebase deploy --only hosting,functions`

#### hosting deploys here: [https://outbreak-9e38c.web.app](https://outbreak-9e38c.web.app) 
#### api deploys here: [https://us-central1-outbreak-9e38c.cloudfunctions.net/app](https://us-central1-outbreak-9e38c.cloudfunctions.net/app)
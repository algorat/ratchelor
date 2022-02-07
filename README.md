A basic app :)

# Running the app

Requirements: Either yarn or npm

Important note: We use firebase to see who is the most popular rat (its egg salad <3) it is not necessary for ratchelor to function, but you need to take it out because if you run ratchelor without some firebase credentials in an .env file in the base directory you will get a “missing projectID” error. 
**If you want to run the app** In the `src` folder we have included a (slightly outdated) version of `App.js` with the firebase stuff taken out, it is called `App_sans_firebase.js` you can rename that file `App.js` after deleting the existing `App.js`.

## With npm

Install all dependencies:

```
npm i
```

Start the app:

```
npm start
```

## With yarn

Install all dependencies:

```
yarn install
```

Start the app:

```
yarn start
```

# Building the app

The app will be built to the /docs folder.

```
yarn run build
```

or

```
npm run build
```

# Deploying the app to staging
Deploys to ratchelor.web.app for QA 

```
npm run staging
```


# Prettifying the app

```
npx prettier --write ./src
```

or 

```
npm run prettify
```

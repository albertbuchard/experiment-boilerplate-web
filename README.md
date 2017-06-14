# Experiment JS

# Install
## Requirements
You need to install Node.js (https://nodejs.org/) and NPM (installed with node).
In your terminal you will now have access to `npm` which allows you to install modules stored on the internet (like experiment.js) and keep track of versions for you if those are updates.


Optional: Yarn is an alternative to NPM that build over it, sometimes makes downloading module faster by keeping some version cached. You can install with `> npm i -g yarn`

## Clone / Install / Build / Launch Server / 🤘🏽
In your terminal, go to the parent folder where you want to copy the boilerplate, then clone the repository.

```
cd to/the/parent/folder
git clone http://www.github.com/albertbuchard/experiment-boilerplate-web nameOfNewFolder`
cd nameOfNewFolder
npm install
npm run build
npm run devserver
```

Then open your favorite browser to http://localhost:8080

## Webpack
With webpack, all your javascript files will be transpiled using babel to make it super compatible accross browsers.
The webpack config is preset for you in webpack.config.babylon.js . For most use case you should not have to modify this file except to change the name of you task.
The builder.js file serves as the single input point for webpack, it loads the startup.js file in which your should put all your set up code. Then webpack will traverse the dependencies on its own to make sure everythin if packed in a final unique file that it will store at /lib/taskName.max.js

With the current configuration, to use webpack write in your terminal :

Build continuously lib/taskName.max.js everytime you change something:
`npm run build`

Build constinuously a minified version of your task for production lib/taskName.min.js (hides codes and make it lighter):
`npm run prod`

Create a local node server:
`npm run devserver`

## PhP local server
If you prefer a local php server - if you have install php on your machine (or if you have a mac) you can write in your terminal:
`npm run phpServer`

If you have installed a mysql local server you could also try the experiment-apis


## Folder structure

- /assets stores all your resources, images, text etc...
    + /sounds
    + /sprites
    + /json
    + ...
- /lib store the webpack processed file
    + taskName.max.js final non minified version of your app
    + taskName.max.js.map mapping allows for easier debugging
    + taskName.min.js production version you should use on your public server
- /src stores your javascript code
    + /startup  
      + startup.js Entry point file where you should set up the task (load ressources, setup scenes and parameters, handle connection/login etc...)
    + /scenes
      + /nameOfTheScene where file for the scene nameOfTheScene are stored
        + /functions holds general function used across the scene
          + generalFunctions.js
        + /states holds the functions relative to each states
          + running.js
          + state2.js
          + state3.js
          + ...
        + NameOfTheScene.js holds the scene generator that will be registered in your task  
    + /utilities
      + taskUtilities.js stores function useful for several scenes / for the experiment in general
    + config.js a file for general config. For now decides wehter or not debug mode should be on (verbose logs in the console, should be false on the public server)


## Authors

- Albert Buchard, **Bavelier Lab** in Geneva
- ❤️ Your name here ❤️ ...

## Licence
Apache-2

/**
 * startUp.js
 *
 * This file holds the code that should run on your HTML page after all the framework and page is loaded.
 *
 * Here you should :
 * - create the taskObject
 * - set up the parameters of the task
 * - register loading promise
 * - register the scenes generators
 * - start the task
 * - bind the task paramBox with relevant parameters
 *
 * Do not pollute the global space with too much variables.
 * Here two global variables are created : taskObject and calibrator.
 */
import $ from 'jquery'
import { RessourceManager, TaskObject, Deferred, debuglog, preloadImages } from 'experiment-js'
// import { SmartForm } from 'experiment-boxes'

import MainScene from '../scenes/main/MainScene'

window.taskObject = null
window.calibrator = null


/* --- Example of a relatively complex preload --- */
// When page is loaded, initiate the task
const defferedDomLoaded = new Deferred()
document.addEventListener('DOMContentLoaded', () => {
  defferedDomLoaded.resolve()
})

if (typeof window !== 'undefined') {
  /* === Get the absolute path of the library === */
  const scripts = document.getElementsByTagName('script')
  if (scripts.length) {
    const assetsFolderFullpath = scripts[scripts.length - 1].src
    const delimiterIndices = assetsFolderFullpath.indicesOf('/')
    window.assetsFolderFullpath = assetsFolderFullpath.substr(0, delimiterIndices[delimiterIndices.length - 2])
  } else {
    window.assetsFolderFullpath = './'
  }
}

const R = new RessourceManager()
window.p1 = defferedDomLoaded.promise
window.p2 = R.addFiles(`${window.assetsFolderFullpath}/assets/json/ressources.json`)

const imageToPreload = ['/assets/sprites/cross/squareSheetMargin.svg']
const [p3, preloadedImages] = preloadImages(...imageToPreload)
Object.assign(window, { p3, preloadedImages })


window.loadingPromise = Promise.all([window.p1, window.p2, window.p3])

/* --- Once every promise is resolved sart seting up the task--- */
window.loadingPromise.then(() => {
  /* --- Creates the task object into the container --- */
  const taskObject = new TaskObject($('.task-canvas'))

    /* --- Register loading scene generator --- */
  // taskObject.registerLoadingFunction(LoadingScene): here we do not use the custom loading scene generator
  taskObject.assetsToLoad = {
    adventurer: '/assets/sprites/adventurer/player.png',
  }


    /* --- Register scene generators --- */
    // You register the function defined in the scene/main/
    // which will be called by the taskobject after loading the assets
  taskObject.registerSceneGenerator(MainScene)

  const sceneNames = ['loading', 'main']

  /* --- ParamBox --- */
    /* list of tweakable variables for the paramBox */
  const parametersNames = ['currentScene']

  const parametersConstraints = { currentScene: sceneNames }

  /* --- Start the task --- */
  taskObject.startTask()
  .then((message) => {
    debuglog(message)
    taskObject.paramBox.bind(taskObject, parametersNames, parametersConstraints)

    if ((sceneNames.length === 1) || (typeof taskObject.paramBox.queryString.currentScene === 'undefined')) {
      taskObject.currentScene = 'main'
    }
  })


  window.taskObject = taskObject

  /* --- Login --- */
  /*
  If you have php and mysql installed on your local server you can try that

  const tempMaxNumberOfRetry = taskObject.dataManager.MAX_NUMBER_OF_RETRY
  const endpoint = `${window.assetsFolderFullpath}/node_modules/experiment-apis/api/php/mysql/index.php`

  /**
   * This function in a form generator that is called automatically by the DataManager when the user needs to login
   * @method loginForm
   * @return {SmartForm}  a SmartForm
   */
  /*
  function loginForm() {
    const fields = {
      userId: {
        type: 'input',
        constraints: 'alpha; length:10,300', // list of constraints that will be automatically verified: mandatory; alpha; numeric; length:XX; contains:a,b,@,.;
        authorizedValues: null, // athorized values
        parent: null,
        title: 'Enter your MTurk UserId:',
      },
      password: {
        type: 'password', // field type: input, select, textaera, slider, radio, password
        constraints: 'length:6,300; score: 50', // list of constraints that will be automatically verified: mandatory; alpha; numeric; length:XX; contains:a,b,@,.;
        authorizedValues: null, // athorized values
        parent: null,
        title: 'Enter your password, if you are new here you are free to pick one !', // you can control auto-create account in the php api config
      },
    }
    const options = { fields, title: 'Login Form', format: 'topCentralSmall', callback(fields) { debuglog({ endpoint, credentials: { userId: fields.userId.value, password: fields.password.value } }) } }
    const form = new SmartForm(options)
    form.buttonText = 'OK'
    return form
  }

  //  If you do not want to store the credentials for the connections localy set this variable to false (the password is not stored in any case, only a logging key)
  // taskObject.dataManager.useLocalStorageCredentials = false
  taskObject.setConnection({ endpoint, signInForm: loginForm }) // credentials: { userId: 'John', password: 'wrong' } })
  .then(connection => (connection.loggedIn ? true : taskObject.dataManager.login(connection)))
  .then(() => {
    // reset the retry limit to its original value
    taskObject.dataManager.MAX_NUMBER_OF_RETRY = tempMaxNumberOfRetry

    /* --- Start task --- */
  //   return taskObject.startTask()
  // })
})

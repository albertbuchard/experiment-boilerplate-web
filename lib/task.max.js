(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("experiment-js"), require("experiment-babylon-js"), require("lodash"), require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define("task", ["experiment-js", "experiment-babylon-js", "lodash", "jQuery"], factory);
	else if(typeof exports === 'object')
		exports["task"] = factory(require("experiment-js"), require("experiment-babylon-js"), require("lodash"), require("jQuery"));
	else
		root["task"] = factory(root["experiment"], root["BABYLON"], root["_"], root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_9__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
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

// import { SmartForm } from 'experiment-boxes'

var _jquery = __webpack_require__(9);

var _jquery2 = _interopRequireDefault(_jquery);

var _experimentJs = __webpack_require__(0);

var _MainScene = __webpack_require__(5);

var _MainScene2 = _interopRequireDefault(_MainScene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.taskObject = null;
window.calibrator = null;

/* --- Example of a relatively complex preload --- */
// When page is loaded, initiate the task
var defferedDomLoaded = new _experimentJs.Deferred();
document.addEventListener('DOMContentLoaded', function () {
  defferedDomLoaded.resolve();
});

if (typeof window !== 'undefined') {
  /* === Get the absolute path of the library === */
  var scripts = document.getElementsByTagName('script');
  if (scripts.length) {
    var assetsFolderFullpath = scripts[scripts.length - 1].src;
    var delimiterIndices = assetsFolderFullpath.indicesOf('/');
    window.assetsFolderFullpath = assetsFolderFullpath.substr(0, delimiterIndices[delimiterIndices.length - 2]);
  } else {
    window.assetsFolderFullpath = './';
  }
}

var R = new _experimentJs.RessourceManager();
window.p1 = defferedDomLoaded.promise;
window.p2 = R.addFiles(window.assetsFolderFullpath + '/assets/json/ressources.json');

var imageToPreload = ['/assets/sprites/cross/squareSheetMargin.svg'];

var _preloadImages = _experimentJs.preloadImages.apply(undefined, imageToPreload),
    _preloadImages2 = _slicedToArray(_preloadImages, 2),
    p3 = _preloadImages2[0],
    preloadedImages = _preloadImages2[1];

Object.assign(window, { p3: p3, preloadedImages: preloadedImages });

window.loadingPromise = Promise.all([window.p1, window.p2, window.p3]

/* --- Once every promise is resolved sart seting up the task--- */
);window.loadingPromise.then(function () {
  /* --- Creates the task object into the container --- */
  var taskObject = new _experimentJs.TaskObject((0, _jquery2.default)('.task-canvas'));

  /* --- Register loading scene generator --- */
  // taskObject.registerLoadingFunction(LoadingScene): here we do not use the custom loading scene generator
  taskObject.assetsToLoad = {
    adventurer: '/assets/sprites/adventurer/player.png'

    /* --- Register scene generators --- */
    // You register the function defined in the scene/main/
    // which will be called by the taskobject after loading the assets
  };taskObject.registerSceneGenerator(_MainScene2.default);

  var sceneNames = ['loading', 'main'];

  /* --- ParamBox --- */
  /* list of tweakable variables for the paramBox */
  var parametersNames = ['currentScene'];

  var parametersConstraints = { currentScene: sceneNames

    /* --- Start the task --- */
  };taskObject.startTask().then(function (message) {
    (0, _experimentJs.debuglog)(message);
    taskObject.paramBox.bind(taskObject, parametersNames, parametersConstraints);

    if (sceneNames.length === 1 || typeof taskObject.paramBox.queryString.currentScene === 'undefined') {
      taskObject.currentScene = 'main';
    }
  });

  window.taskObject = taskObject;

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
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Experiment.js
 * Created. 2016
 *
 * Experiment.js toolbox.
 *
 * Authors. Albert Buchard
 *
 * Requires: lodash, BABYLON.js, mathjs, jQuery
 *
 * LICENSE Apache-2
 */

/* --- Import the framework --- */

/* add it to the global space in case user want to import in a script tag */
if (typeof window !== 'undefined') {
  __webpack_require__(3);
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (_experimentJs.Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = MainScene;

var _lodash = __webpack_require__(2);

var _lodash2 = _interopRequireDefault(_lodash);

var _experimentBabylonJs = __webpack_require__(1);

var _experimentBabylonJs2 = _interopRequireDefault(_experimentBabylonJs);

var _experimentJs = __webpack_require__(0);

var _tutorial = __webpack_require__(8);

var _running = __webpack_require__(7);

var _globalFunctions = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* =============== Main scene =============== */
function MainScene() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // option base
  var optionsBase = {
    sceneKey: 'main',
    canvasBackground: new _experimentBabylonJs2.default.Color4(0, 0, 0, 1),
    backgroundRoundRadius: 0,
    clearColor: new _experimentBabylonJs2.default.Color4(0, 0, 0, 1),
    canvasPercentWidth: 1,
    canvasPercentHeight: 1,
    mode: 'central'
  };

  options = _lodash2.default.extend(optionsBase, options

  /* --- Get taskObject from context --- */
  );var taskObject = this.taskObject;

  /* --- Create a basic 2D scene using a Canvas2D as background --- */
  var scene = taskObject.create2DScene(options

  /* --- Get stateManager --- */
  );var stateManager = scene.stateManager;

  /* --- Get canvas --- */
  var canvas = scene.initialCanvas;

  var R = taskObject.R;

  scene.onResize = [function () {
    (0, _experimentJs.debuglog)('scene.onResize: this is a custom function to be called on resize events');
  }];

  /* --- Load assets --- */
  // const sounds = {
  //   observation: taskObject.cloneAssetIntoScene(R.get.sounds_observation, scene),
  //   prediction: taskObject.cloneAssetIntoScene(R.get.sounds_predict, scene),
  // }
  // stateManager.setGlobal('sounds', sounds)


  var adventurerTexture = taskObject.cloneAssetIntoScene(R.get.adventurer, scene);
  adventurerTexture.hasAlpha = true;

  var adventurer = new _experimentBabylonJs2.default.Sprite2D(adventurerTexture, {
    parent: canvas,
    id: 'adventurer',
    x: 100,
    y: 100,
    spriteSize: new _experimentBabylonJs2.default.Size(64, 64),
    spriteLocation: new _experimentBabylonJs2.default.Vector2(0, 128)
  });

  var timerId = setInterval(function () {
    if (canvas.isDisposed) {
      clearInterval(timerId);
      return;
    }
    if (adventurer.spriteFrame === 21) {
      adventurer.spriteFrame = 0;
    } else {
      adventurer.spriteFrame += 1;
    }
  }, 40);

  adventurer.opacity = 0;

  /* --- Set some global variables --- */
  // store in the stateManager a reference to the adventurer
  stateManager.set('elements2D', { adventurer: adventurer, canvas: canvas }

  /* --- Register some global functions --- */
  );stateManager.register(_globalFunctions.addButton, _globalFunctions.disposeOfButtons

  /* --- Setup data --- */
  );var dataManager = this.dataManager;

  /* --- Add mainSceneData table that will hold your scene data --- */
  var dataFields = ['id', 'subject_id', 'level', 'block'];

  dataManager.addTable('mainSceneData', dataFields

  /* --- Add the logs for each level --- */
  );var eventFields = ['id', 'flag', 'happenedAt', 'handledAt', 'data'];
  dataManager.addTable('mainSceneEvents', eventFields

  /* --- Store scene level inside the stateManager --- */
  );stateManager.setGlobal('positionData', {
    indexOnTransitionSequence: -1,
    indexOnPredictionSequence: -1,
    fullSequenceIndex: -1
  });

  stateManager.setGlobal('hasSeenLearningInfo', false);
  stateManager.setGlobal('hasSeenPredictionInfo', false
  /* --- Setup states --- */

  /* --- Set state key and store them in the stateManager --- */
  );R.add({
    states: {
      running: 'running',
      tutorial: 'tutorial'
    },
    flags: {
      levelDefined: 'levelDefined'
    },
    events: {
      goNextPosition: 'goNextPosition',
      screenWentBlack: 'screenWentBlack',
      playPredictionSound: 'playPredictionSound',
      playObservationSound: 'playObservationSound',
      showModal: 'showModal',
      goToTutorial: 'goToTutorial',
      restartTutorial: 'restartTutorial'
    }
  }

  /* --- Create the states --- */
  // eslint-disable-next-line
  );
  var _stateManager$addStat = stateManager.addState(R.get.states_tutorial, R.get.states_running),
      _stateManager$addStat2 = _slicedToArray(_stateManager$addStat, 2),
      tutorialState = _stateManager$addStat2[0],
      runningState = _stateManager$addStat2[1];

  var pauseState = stateManager.states.pause;

  /* ======== State Active ======== */
  var selectLevel = function selectLevel() {
    var stateManager = this.stateManager;
    var elements2D = stateManager.get('elements2D');
    var GUI = stateManager.get('GUI' // this is a cavas on top of the main canvas that is made ot hold buttons, tooltips etc.

    );GUI.levelVisible = true;
    /* --- Delete buttons --- */
    stateManager.promise('disposeOfButtons');

    var eventButtonTutorialOne = new _experimentJs.EventData(R.get.events_goToTutorial, stateManager.timeInMs, {
      tutorial: 1
    });

    var width = 220;
    var height = 40;
    var widthOffset = width / 2;

    var buttonOptionLevelOne = {
      id: 'levelOne',
      parent: GUI,
      text: 'Level 1',
      marginAlignment: 'h: center, v: bottom',
      margin: {
        rightPixels: width + widthOffset,
        topPixels: 0
      },
      width: width,
      height: height,
      fill: _experimentBabylonJs2.default.Canvas2D.GetSolidColorBrush(new _experimentBabylonJs2.default.Color4(0.8, 0.8, 0.8, 1)),
      callbackFunction: null,
      fontName: '20pt Arial',
      baseOpacity: 0.8,
      hoverOpacity: 1
    };

    var buttonOptionTutorialOne = _lodash2.default.extend(_lodash2.default.clone(buttonOptionLevelOne), {
      id: 'buttonTutorialLevelFour',
      text: 'Tutorial 1',
      margin: {
        rightPixels: width + widthOffset,
        bottomPixels: height
      },
      clickEventData: eventButtonTutorialOne
    });

    return stateManager.promise('addButton', buttonOptionTutorialOne).then(function (buttons) {
      elements2D.levelButtons = buttons;
      if (buttons.constructor === _experimentBabylonJs2.default.Rectangle2D) {
        buttons = [buttons];
      }
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = buttons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var button = _step.value;

          button.levelVisible = true;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return 'stateManager.selectLevel: resolved';
    });
  };

  stateManager.states.active.addAwakeningFunctions(selectLevel);

  stateManager.states.active.addEventFunctions(R.get.events_goToTutorial, function (_ref) {
    var tutorial = _ref.data.tutorial;

    stateManager.setGlobal('currentTutorial', tutorial);
    stateManager.goToState(R.get.states_tutorial);
  }

  /* ======== State RUNNING ======== */

  /* --- Register functions --- */
  );runningState.addAwakeningFunctions(_running.startRunning);

  runningState.addEventFunctions(R.get.events_goNextPosition, _running.goToNextPosition);
  runningState.addEventFunctions(R.get.events_click, _running.checkForClickPrediction

  /* ======= State Tutorial ======= */
  );tutorialState.addAwakeningFunctions(_tutorial.awakeTutorial);

  tutorialState.addEventFunctions(R.get.events_modalDismissed, _tutorial.showNextPage);
  tutorialState.addEventFunctions(R.get.events_showModal, _tutorial.showModal

  /* ======== State Pause ======== */
  );stateManager.setPauseKeyStroke();
  pauseState.addAwakeningFunctions(selectLevel);
  pauseState.addEndingFunctions(function () {
    this.stateManager.promise('disposeOfButtons');
  });

  return scene;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disposeOfButtons = exports.addButton = undefined;

var _lodash = __webpack_require__(2);

var _lodash2 = _interopRequireDefault(_lodash);

var _experimentBabylonJs = __webpack_require__(1);

var _experimentBabylonJs2 = _interopRequireDefault(_experimentBabylonJs);

var _experimentJs = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* --- Setup stateManager functions --- */

var addButton = function addButton() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (typeof this.taskObject === 'undefined') {
    throw new Error('stateManager.addButton: this.taskObject is undefined');
  }

  var stateManager = this.stateManager;
  var canvas = stateManager.get('elements2D').canvas;

  var baseOptions = {
    id: 'button' + stateManager.timeInMs,
    text: 'text',
    x: 50,
    y: 50,
    width: 100,
    height: 50,
    fill: _experimentBabylonJs2.default.Canvas2D.GetSolidColorBrush(new _experimentBabylonJs2.default.Color4(0.8, 0.8, 0.8, 1)),
    clickEventData: null,
    fontName: '30pt Arial',
    baseOpacity: 0.8,
    hoverOpacity: 1,
    zOrder: -0.5,
    marginAlignment: null,
    fontSignedDistanceField: true,
    margin: {},
    padding: {},
    parent: canvas
  };

  baseOptions.margin.leftPixels = 0;
  baseOptions.margin.rightPixels = 0;
  baseOptions.margin.topPixels = 0;
  baseOptions.margin.bottomPixels = 0;
  baseOptions.padding.leftPixels = 0;
  baseOptions.padding.rightPixels = 0;
  baseOptions.padding.topPixels = 0;
  baseOptions.padding.bottomPixels = 0;
  baseOptions.margin = _lodash2.default.extend(baseOptions.margin, options.margin);
  baseOptions.padding = _lodash2.default.extend(baseOptions.padding, options.padding);
  options.margin = baseOptions.margin;
  options.padding = baseOptions.padding;

  // extend options
  options = _lodash2.default.extend(baseOptions, options);

  var buttonOptions = {};
  var margin = {};
  var padding = {};
  if (options.marginAlignment === null) {
    buttonOptions = {
      parent: options.parent,
      id: options.id,
      x: options.x,
      y: options.y,
      width: options.width,
      height: options.height,
      fill: options.fill,
      zOrder: options.zOrder,
      roundRadius: 0,
      children: [new _experimentBabylonJs2.default.Text2D(options.text, {
        fontName: options.fontName,
        marginVAlignment: 'v: center',
        fontSignedDistanceField: options.fontSignedDistanceField,
        marginHAlignment: 3
      })]
    };
  } else {
    buttonOptions = {
      parent: options.parent,
      id: options.id,
      width: options.width,
      height: options.height,
      fill: options.fill,
      zOrder: options.zOrder,
      marginAlignment: options.marginAlignment,
      roundRadius: 0,
      children: [new _experimentBabylonJs2.default.Text2D(options.text, {
        fontName: options.fontName,
        marginVAlignment: 'v: center',
        fontSignedDistanceField: options.fontSignedDistanceField,
        marginHAlignment: 3
      })]
    };
    margin = options.margin;
    padding = options.padding;
  }

  // create button and add to canvas
  var buttonRect = new _experimentBabylonJs2.default.Rectangle2D(buttonOptions);

  buttonRect.opacity = options.baseOpacity;

  if (margin !== null) {
    buttonRect.margin.rightPixels = options.margin.rightPixels; // TODO make that a specific function in the framework
    buttonRect.margin.leftPixels = options.margin.leftPixels;
    buttonRect.margin.topPixels = options.margin.topPixels;
    buttonRect.margin.bottomPixels = options.margin.bottomPixels;
  }

  if (padding !== null) {
    buttonRect.padding.rightPixels = padding.rightPixels;
    buttonRect.padding.leftPixels = padding.leftPixels;
    buttonRect.padding.topPixels = padding.topPixels;
    buttonRect.padding.bottomPixels = padding.bottomPixels;
  }

  // Add an observable for hovering
  buttonRect.pointerEventObservable.add(function () {
    buttonRect.opacity = options.hoverOpacity;
  }, _experimentBabylonJs2.default.PrimitivePointerInfo.PointerOver);

  buttonRect.pointerEventObservable.add(function () {
    buttonRect.opacity = options.baseOpacity;
  }, _experimentBabylonJs2.default.PrimitivePointerInfo.PointerOut

  // Add an observable for clicking
  );if (options.clickEventData !== null && options.clickEventData.constructor === _experimentJs.EventData) {
    buttonRect.pointerEventObservable.add(function () {
      options.clickEventData.happenedAt = stateManager.timeInMs;

      stateManager.addEvent(options.clickEventData);
    }, _experimentBabylonJs2.default.PrimitivePointerInfo.PointerUp);
  }

  return buttonRect;
};

var disposeOfButtons = function disposeOfButtons() {
  var elements2D = this.stateManager.get('elements2D');

  if (typeof elements2D.levelButtons !== 'undefined') {
    if (elements2D.levelButtons.constructor === _experimentBabylonJs2.default.Rectangle2D) {
      elements2D.levelButtons = [elements2D.levelButtons];
    }
    if (elements2D.levelButtons.constructor === _experimentJs.Array) {
      for (var i = 0; i < elements2D.levelButtons.length; i++) {
        elements2D.levelButtons[i].dispose();
      }
      elements2D.levelButtons = [];
    }
  }

  return 'disposeOfButtons: buttons disposed.';
};

exports.addButton = addButton;
exports.disposeOfButtons = disposeOfButtons;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkForClickPrediction = exports.goToNextPosition = exports.startRunning = undefined;

var _lodash = __webpack_require__(2);

var _lodash2 = _interopRequireDefault(_lodash);

var _experimentBabylonJs = __webpack_require__(1);

var _experimentBabylonJs2 = _interopRequireDefault(_experimentBabylonJs);

var _experimentJs = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* --- State function --- */

var startRunning = function startRunning() {
  // in those functions called by the stateManager :
  // this = taskObject.context
  // You can access all the relevant object with this.(taskObject, scene, stateManager, state, R)
  var stateManager = this.stateManager;
  var R = stateManager.R;

  /* --- Store the data --- */
  // Prepare the first 'goToNextPosition' event
  var nextTransitionTime = this.stateManager.timeInMs + 100; // this event will fire at a later time
  var nextTransitionEvent = new _experimentJs.EventData(R.get.events_goNextPosition, nextTransitionTime, {
    belongsTo: ['globalLog'], // tables to store the event in
    handledAt: null,
    storedAt: null
  });

  // Add the future event to the pile of time triggered event
  stateManager.addTimeTriggerEvent(nextTransitionEvent);

  return 'state.startRunning: resolved';
};

var goToNextPosition = function goToNextPosition() {
  var stateManager = this.stateManager;
  var elements2D = stateManager.get('elements2D');

  elements2D.adventurer.opacity = 1;

  elements2D.adventurer.x = _lodash2.default.random(50, this.taskObject.renderSize.width);
  elements2D.adventurer.y = _lodash2.default.random(50, this.taskObject.renderSize.height);

  return 'Changed position';
};

var checkForClickPrediction = function checkForClickPrediction() {
  var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();

  if (typeof event.data.clientY === 'undefined') {
    (0, _experimentJs.debugError)('state.checkForClickPrediction: event.data.clientY is undefined.');
    return null;
  }

  var stateManager = this.stateManager;
  var clickVector = new _experimentBabylonJs2.default.Vector2(event.data.engineX, event.data.engineY);

  var elements2D = stateManager.get('elements2D');
  var canvasPosition = elements2D.canvas.actualPosition;

  var isAOverB = function isAOverB(positionA, positionB, sizeB) {
    if (_experimentBabylonJs2.default.Vector2.DistanceSquared(positionA, positionB) < sizeB.lengthSquared()) {
      return true;
    }
    return false;
  };

  var adventurer = elements2D.adventurer;
  // var sizeVector = (new BABYLON.Vector2(agent.size.width, agent.size.height)).scaleInPlace(agent.scale);
  var sizeVector = new _experimentBabylonJs2.default.Vector2(adventurer.width, adventurer.height);
  sizeVector.scaleInPlace(0.5);

  if (isAOverB(clickVector, adventurer.actualPosition.add(sizeVector).add(canvasPosition), sizeVector)) {
    // Add an immediate event to the pile of event that will be treated at the next update
    stateManager.newEvent(this.R.get.events_goNextPosition);
  }
  return 'checkForClickPrediction resolved';
};

exports.startRunning = startRunning;
exports.goToNextPosition = goToNextPosition;
exports.checkForClickPrediction = checkForClickPrediction;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showModal = exports.showNextPage = exports.awakeTutorial = undefined;

var _experimentJs = __webpack_require__(0);

// You are not forced to use the Ressourcemanager or the state globals
var intro = {
  title: { en: 'This is the tutorial state' },
  content: {
    en: '\n    <h5>Welcome ! \uD83D\uDC4B\uD83C\uDFFD \uD83D\uDE04 </h5>\n    This is a SmartModal, from the experiment-boxes module. Shift+P would show you the ParamBox<br>\n    If you click the button below, an "modal_dismissed" event will fire and trigger the next modal to appear<br><br>'
  }
};

var disclaimer = {
  title: { en: '😬' },
  content: {
    en: 'How fun is that !<br>\n  Let\'s do another one \u270C\uD83C\uDFFD\uD83D\uDE09 '
  }
};

var trialInstruction = {
  title: { en: 'There is no small examples' },
  content: { en: '<h5>Time to act</h5>\n    Try clicking on the little adventurer !\n    <br>' }
};
var tutorials = {
  disclaimer: disclaimer,
  intro: intro,
  trialInstruction: trialInstruction
};

var pageOrderTutorialOne = ['intro', 'disclaimer', 'trialInstruction'];

var awakeTutorial = function awakeTutorial() {
  this.stateManager.set('currentPage', 'intro');
  this.stateManager.call('disposeOfButtons');
  var showIntro = new _experimentJs.EventData(this.R.get.events_showModal, this.stateManager.timeInMs + 100, { page: 'intro' });
  this.stateManager.addTimeTriggerEvent(showIntro);
};

var showModal = function showModal(_ref) {
  var _this = this;

  var _ref$data$page = _ref.data.page,
      page = _ref$data$page === undefined ? 'intro' : _ref$data$page;

  if (this.taskObject.currentModal !== null) {
    try {
      this.taskObject.currentModal.modalBox.destroy();
    } catch (e) {
      (0, _experimentJs.debugWarn)(e);
    }
  }

  // Sometimes modals and divs need some time to place themselves in the DOM, those short delay allow for it
  // TODO hopefully this will get fixed in future version
  (0, _experimentJs.delay)(50).then(function () {
    if (tutorials.hasOwnProperty(page)) {
      var tutorial = tutorials[page];
      var event = new _experimentJs.EventData(_this.R.get.events_modalDismissed, { page: page });
      _this.taskObject.modal({ type: 'centralLarge', title: tutorial.title.en, content: tutorial.content.en, event: event });
    }
  });
};

var showNextPage = function showNextPage(_ref2) {
  var _ref2$data$page = _ref2.data.page,
      currentPage = _ref2$data$page === undefined ? this.stateManager.get('currentPage', 'intro') : _ref2$data$page;

  var pageOrder = pageOrderTutorialOne;

  var currentIndex = pageOrder.indexOf(currentPage);
  if (currentIndex !== -1) {
    if (currentIndex !== pageOrder.length - 1) {
      var showEvent = new _experimentJs.EventData(this.R.get.events_showModal, { page: pageOrder[currentIndex + 1] });
      this.stateManager.addEvent(showEvent);
    } else {
      (0, _experimentJs.debuglog)('state.showNextPage: end of tutorial.');
      this.stateManager.goToState(this.R.get.states_running, true);
    }
  } else {
    (0, _experimentJs.debugError)('state.showNextPage: invalid currentPage.');
  }
};

exports.awakeTutorial = awakeTutorial;
exports.showNextPage = showNextPage;
exports.showModal = showModal;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=task.max.js.map
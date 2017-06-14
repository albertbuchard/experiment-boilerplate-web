import _ from 'lodash'
import BABYLON from 'experiment-babylon-js'
import {
  EventData,
  Array, // eslint-disable-line
  String, // eslint-disable-line
  debuglog,
} from 'experiment-js'


import { awakeTutorial, showModal, showNextPage } from './states/tutorial'

import {
  startRunning,
  goToNextPosition,
  checkForClickPrediction,
} from './states/running'

import {
  drawTiles,
  addButton,
  disposeOfButtons,
} from './functions/globalFunctions'

/* =============== Main scene =============== */
export default function MainScene(options = {}) {
  // option base
  const optionsBase = {
    sceneKey: 'main',
    canvasBackground: new BABYLON.Color4(0, 0, 0, 1),
    backgroundRoundRadius: 0,
    clearColor: new BABYLON.Color4(0, 0, 0, 1),
    canvasPercentWidth: 1,
    canvasPercentHeight: 1,
    mode: 'central',
  }

  options = _.extend(optionsBase, options)

  /* --- Get taskObject from context --- */
  const taskObject = this.taskObject

  /* --- Create a basic 2D scene using a Canvas2D as background --- */
  const scene = taskObject.create2DScene(options)

  /* --- Get stateManager --- */
  const stateManager = scene.stateManager

  /* --- Get canvas --- */
  const canvas = scene.initialCanvas

  const R = taskObject.R

  scene.onResize = [function () { debuglog('scene.onResize: this is a custom function to be called on resize events') }]

  /* --- Load assets --- */
  // const sounds = {
  //   observation: taskObject.cloneAssetIntoScene(R.get.sounds_observation, scene),
  //   prediction: taskObject.cloneAssetIntoScene(R.get.sounds_predict, scene),
  // }
  // stateManager.setGlobal('sounds', sounds)


  const adventurerTexture = taskObject.cloneAssetIntoScene(R.get.adventurer, scene)
  adventurerTexture.hasAlpha = true

  const adventurer = new BABYLON.Sprite2D(adventurerTexture, {
    parent: canvas,
    id: 'adventurer',
    x: 100,
    y: 100,
    spriteSize: new BABYLON.Size(64, 64),
    spriteLocation: new BABYLON.Vector2(0, 128),
  })


  const timerId = setInterval(() => {
    if (canvas.isDisposed) {
      clearInterval(timerId)
      return
    }
    if (adventurer.spriteFrame === 21) {
      adventurer.spriteFrame = 0
    } else {
      adventurer.spriteFrame += 1
    }
  }, 40)

  adventurer.opacity = 0


  /* --- Set some global variables --- */
  // store in the stateManager a reference to the adventurer
  stateManager.set('elements2D', { adventurer, canvas })

  /* --- Register some global functions --- */
  stateManager.register(addButton,
    disposeOfButtons)

  /* --- Setup data --- */
  const dataManager = this.dataManager

  /* --- Add mainSceneData table that will hold your scene data --- */
  const dataFields = [
    'id',
    'subject_id',
    'level',
    'block',
  ]

  dataManager.addTable('mainSceneData', dataFields)

  /* --- Add the logs for each level --- */
  const eventFields = ['id', 'flag', 'happenedAt', 'handledAt', 'data']
  dataManager.addTable('mainSceneEvents', eventFields)

  /* --- Store scene level inside the stateManager --- */
  stateManager.setGlobal('positionData', {
    indexOnTransitionSequence: -1,
    indexOnPredictionSequence: -1,
    fullSequenceIndex: -1,
  })

  stateManager.setGlobal('hasSeenLearningInfo', false)
  stateManager.setGlobal('hasSeenPredictionInfo', false)
  /* --- Setup states --- */

  /* --- Set state key and store them in the stateManager --- */
  R.add({
    states: {
      running: 'running',
      tutorial: 'tutorial',
    },
    flags: {
      levelDefined: 'levelDefined',
    },
    events: {
      goNextPosition: 'goNextPosition',
      screenWentBlack: 'screenWentBlack',
      playPredictionSound: 'playPredictionSound',
      playObservationSound: 'playObservationSound',
      showModal: 'showModal',
      goToTutorial: 'goToTutorial',
      restartTutorial: 'restartTutorial',
    },
  })

  /* --- Create the states --- */
  // eslint-disable-next-line
  const [tutorialState, runningState] = stateManager.addState(R.get.states_tutorial, R.get.states_running)
  const pauseState = stateManager.states.pause

  /* ======== State Active ======== */
  const selectLevel = function () {
    const stateManager = this.stateManager
    const elements2D = stateManager.get('elements2D')
    const GUI = stateManager.get('GUI') // this is a cavas on top of the main canvas that is made ot hold buttons, tooltips etc.

    GUI.levelVisible = true
    /* --- Delete buttons --- */
    stateManager.promise('disposeOfButtons')

    const eventButtonTutorialOne = new EventData(R.get.events_goToTutorial, stateManager.timeInMs, {
      tutorial: 1,
    })

    const width = 220
    const height = 40
    const widthOffset = width / 2

    const buttonOptionLevelOne = {
      id: 'levelOne',
      parent: GUI,
      text: 'Level 1',
      marginAlignment: 'h: center, v: bottom',
      margin: {
        rightPixels: (width) + widthOffset,
        topPixels: 0,
      },
      width,
      height,
      fill: BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color4(0.8, 0.8, 0.8, 1)),
      callbackFunction: null,
      fontName: '20pt Arial',
      baseOpacity: 0.8,
      hoverOpacity: 1,
    }

    const buttonOptionTutorialOne = _.extend(_.clone(buttonOptionLevelOne), {
      id: 'buttonTutorialLevelFour',
      text: 'Tutorial 1',
      margin: {
        rightPixels: (width) + widthOffset,
        bottomPixels: height,
      },
      clickEventData: eventButtonTutorialOne,
    })


    return stateManager.promise('addButton', buttonOptionTutorialOne)
      .then((buttons) => {
        elements2D.levelButtons = buttons
        if (buttons.constructor === BABYLON.Rectangle2D) { buttons = [buttons] }
        for (const button of buttons) {
          button.levelVisible = true
        }
        return 'stateManager.selectLevel: resolved'
      })
  }

  stateManager.states.active.addAwakeningFunctions(selectLevel)

  stateManager.states.active.addEventFunctions(R.get.events_goToTutorial,
    ({ data: { tutorial } }) => {
      stateManager.setGlobal('currentTutorial', tutorial)
      stateManager.goToState(R.get.states_tutorial)
    })

  /* ======== State RUNNING ======== */

  /* --- Register functions --- */
  runningState.addAwakeningFunctions(startRunning)

  runningState.addEventFunctions(R.get.events_goNextPosition, goToNextPosition)
  runningState.addEventFunctions(R.get.events_click, checkForClickPrediction)

  /* ======= State Tutorial ======= */
  tutorialState.addAwakeningFunctions(awakeTutorial)

  tutorialState.addEventFunctions(R.get.events_modalDismissed, showNextPage)
  tutorialState.addEventFunctions(R.get.events_showModal, showModal)


  /* ======== State Pause ======== */
  stateManager.setPauseKeyStroke()
  pauseState.addAwakeningFunctions(selectLevel)
  pauseState.addEndingFunctions(function () { this.stateManager.promise('disposeOfButtons') })


  return scene
}

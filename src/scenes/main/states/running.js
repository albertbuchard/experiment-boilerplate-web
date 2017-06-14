import _ from 'lodash'
import BABYLON from 'experiment-babylon-js'
import {
  EventData,
  Array, // eslint-disable-line
  String, // eslint-disable-line
  mandatory,
  debugError,
} from 'experiment-js'

  /* --- State function --- */

const startRunning = function () {
  // in those functions called by the stateManager :
  // this = taskObject.context
  // You can access all the relevant object with this.(taskObject, scene, stateManager, state, R)
  const stateManager = this.stateManager
  const R = stateManager.R

  /* --- Store the data --- */
  // Prepare the first 'goToNextPosition' event
  const nextTransitionTime = this.stateManager.timeInMs + 100 // this event will fire at a later time
  const nextTransitionEvent = new EventData(R.get.events_goNextPosition, nextTransitionTime, {
    belongsTo: ['globalLog'], // tables to store the event in
    handledAt: null,
    storedAt: null,
  })

  // Add the future event to the pile of time triggered event
  stateManager.addTimeTriggerEvent(nextTransitionEvent)

  return ('state.startRunning: resolved')
}

const goToNextPosition = function () {
  const stateManager = this.stateManager
  const elements2D = stateManager.get('elements2D')

  elements2D.adventurer.opacity = 1

  elements2D.adventurer.x = _.random(50, this.taskObject.renderSize.width)
  elements2D.adventurer.y = _.random(50, this.taskObject.renderSize.height)

  return 'Changed position'
}


const checkForClickPrediction = function (event = mandatory()) {
  if (typeof event.data.clientY === 'undefined') {
    debugError('state.checkForClickPrediction: event.data.clientY is undefined.')
    return null
  }

  const stateManager = this.stateManager
  const clickVector = new BABYLON.Vector2(event.data.engineX, event.data.engineY)

  const elements2D = stateManager.get('elements2D')
  const canvasPosition = elements2D.canvas.actualPosition

  const isAOverB = function (positionA, positionB, sizeB) {
    if (BABYLON.Vector2.DistanceSquared(positionA, positionB) < sizeB.lengthSquared()) {
      return true
    }
    return false
  }

  const adventurer = elements2D.adventurer
    // var sizeVector = (new BABYLON.Vector2(agent.size.width, agent.size.height)).scaleInPlace(agent.scale);
  const sizeVector = new BABYLON.Vector2(adventurer.width, adventurer.height)
  sizeVector.scaleInPlace(0.5)

  if (isAOverB(clickVector, ((adventurer.actualPosition).add(sizeVector)).add(canvasPosition), sizeVector)) {
    // Add an immediate event to the pile of event that will be treated at the next update
    stateManager.newEvent(this.R.get.events_goNextPosition)
  }
  return 'checkForClickPrediction resolved'
}

export {
  startRunning,
  goToNextPosition,
  checkForClickPrediction,
}

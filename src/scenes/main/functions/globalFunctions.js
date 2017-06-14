import _ from 'lodash'
import BABYLON from 'experiment-babylon-js'
import {
  EventData,
  Array,
  String, // eslint-disable-line
} from 'experiment-js'


/* --- Setup stateManager functions --- */

const addButton = function (options = null) {
  if (typeof this.taskObject === 'undefined') {
    throw new Error('stateManager.addButton: this.taskObject is undefined')
  }

  const stateManager = this.stateManager
  const canvas = stateManager.get('elements2D').canvas

  const baseOptions = {
    id: `button${stateManager.timeInMs}`,
    text: 'text',
    x: 50,
    y: 50,
    width: 100,
    height: 50,
    fill: BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color4(0.8, 0.8, 0.8, 1)),
    clickEventData: null,
    fontName: '30pt Arial',
    baseOpacity: 0.8,
    hoverOpacity: 1,
    zOrder: -0.5,
    marginAlignment: null,
    fontSignedDistanceField: true,
    margin: {},
    padding: {},
    parent: canvas,
  }

  baseOptions.margin.leftPixels = 0
  baseOptions.margin.rightPixels = 0
  baseOptions.margin.topPixels = 0
  baseOptions.margin.bottomPixels = 0
  baseOptions.padding.leftPixels = 0
  baseOptions.padding.rightPixels = 0
  baseOptions.padding.topPixels = 0
  baseOptions.padding.bottomPixels = 0
  baseOptions.margin = _.extend(baseOptions.margin, options.margin)
  baseOptions.padding = _.extend(baseOptions.padding, options.padding)
  options.margin = baseOptions.margin
  options.padding = baseOptions.padding

  // extend options
  options = _.extend(baseOptions, options)

  let buttonOptions = {}
  let margin = {}
  let padding = {}
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
      children: [new BABYLON.Text2D(options.text, {
        fontName: options.fontName,
        marginVAlignment: 'v: center',
        fontSignedDistanceField: options.fontSignedDistanceField,
        marginHAlignment: 3,
      })],
    }
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
      children: [new BABYLON.Text2D(options.text, {
        fontName: options.fontName,
        marginVAlignment: 'v: center',
        fontSignedDistanceField: options.fontSignedDistanceField,
        marginHAlignment: 3,
      })],
    }
    margin = options.margin
    padding = options.padding
  }

  // create button and add to canvas
  const buttonRect = new BABYLON.Rectangle2D(buttonOptions)

  buttonRect.opacity = options.baseOpacity

  if (margin !== null) {
    buttonRect.margin.rightPixels = options.margin.rightPixels // TODO make that a specific function in the framework
    buttonRect.margin.leftPixels = options.margin.leftPixels
    buttonRect.margin.topPixels = options.margin.topPixels
    buttonRect.margin.bottomPixels = options.margin.bottomPixels
  }

  if (padding !== null) {
    buttonRect.padding.rightPixels = padding.rightPixels
    buttonRect.padding.leftPixels = padding.leftPixels
    buttonRect.padding.topPixels = padding.topPixels
    buttonRect.padding.bottomPixels = padding.bottomPixels
  }

  // Add an observable for hovering
  buttonRect.pointerEventObservable.add(() => {
    buttonRect.opacity = options.hoverOpacity
  }, BABYLON.PrimitivePointerInfo.PointerOver)

  buttonRect.pointerEventObservable.add(() => {
    buttonRect.opacity = options.baseOpacity
  }, BABYLON.PrimitivePointerInfo.PointerOut)

  // Add an observable for clicking
  if ((options.clickEventData !== null) && (options.clickEventData.constructor === EventData)) {
    buttonRect.pointerEventObservable.add(() => {
      options.clickEventData.happenedAt = stateManager.timeInMs


      stateManager.addEvent(options.clickEventData)
    }, BABYLON.PrimitivePointerInfo.PointerUp)
  }

  return (buttonRect)
}

const disposeOfButtons = function () {
  const elements2D = this.stateManager.get('elements2D')

  if (typeof elements2D.levelButtons !== 'undefined') {
    if (elements2D.levelButtons.constructor === BABYLON.Rectangle2D) { elements2D.levelButtons = [elements2D.levelButtons] }
    if (elements2D.levelButtons.constructor === Array) {
      for (let i = 0; i < elements2D.levelButtons.length; i++) {
        elements2D.levelButtons[i].dispose()
      }
      elements2D.levelButtons = []
    }
  }

  return ('disposeOfButtons: buttons disposed.')
}

export {
  addButton,
  disposeOfButtons }

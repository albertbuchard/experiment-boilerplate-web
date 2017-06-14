/** @module taskUtilities */
import math from 'experiment-mathjs'
import _ from 'lodash'

import { mandatory, rep } from 'experiment-js'
import BABYLON from 'experiment-babylon-js'

/* ======= Texture Functions ======= */
const getAspectRatio = function (surfaceObject = mandatory()) {
  if (surfaceObject.constructor === BABYLON.Texture) {
    const { width: w, height: h } = surfaceObject.getBaseSize()
    return (w / h)
  }

  throw new Error('getAspectRatio: object type not valid.')
}

const positionToVector = function (position = mandatory(), numberOfPositions = 4) {
  // const maxIndex = numberOfPositions - 1
  if (Number.isInteger(position)) {
    let vectorPosition = rep(0, numberOfPositions)
    vectorPosition[position] = 1
    vectorPosition = math.matrix(vectorPosition)

    return vectorPosition
  }
  throw new Error('taskObject.positionToVector: position is not numeric.')
}

const vectorToPosition = function (vector = mandatory()) {
  if (vector.constructor !== math.matrix().constructor) {
    if (vector.constructor === Array) {
      vector = math.matrix(vector)
    } else {
      throw new Error('taskObject.vectorToPosition: vector is not of type math.matrix() or Array')
    }
  }

  if ((vector.size()).length > 1) {
    throw new Error('taskObject.vectorToPosition: vector has more than one dimension.')
  }

  let position = null
  vector.forEach((value, index) => {
    switch (value) {
      case 1:
        if (position === null) {
          position = index[0]
        } else {
          throw new Error('taskObject.vectorToPosition: vector has more than one entry equal to 1.')
        }
        break
      case 0:
        break
      default:
        throw new Error(`taskObject.vectorToPosition: vector has at least one entry not equal to 0 or 1. Entry ${value}`)
    }
  })

  if (position === null) {
    throw new Error('taskObject.vectorToPosition: no entry equal to one was found in vector, position is null.')
  }

  return position
}

const getDensity = function (elements, nsteps = 100, windowSize = 3) { // eslint-disable-line
  if (elements.some(isNaN)) {
    throw new Error('TaskObject.getDensity: elements are not all numeric.')
  }

  const range = [math.min(elements), math.max(elements)]

  const stepSize = (range[1] - range[0]) / nsteps
  // const windowLenght = stepSize * windowSize

  const elementsInWindow = []
  const windowPosition = []
  const density = []
  const points = []
  for (let i = 0; i < nsteps; i++) {
    const subset = _.filter(elements, (e) => {
      const centered = e - range[0] - (i * stepSize)
      return ((centered >= 0) && (centered < stepSize))
    })

    windowPosition[i] = (i + 0.5) * stepSize
    elementsInWindow[i] = subset.length
    density[i] = elementsInWindow[i] / elements.length
    points[i] = {
      x: windowPosition[i],
      y: density[i],
    }
  }

  return ({
    windows: {
      position: windowPosition,
      numberOfElements: elementsInWindow,
      density,
    },
    points,
    chartOptions: {
      type: 'line',
      data: {
        datasets: [{
          label: 'Density',
          data: points,
        }],
      },
      options: {
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
          }],
        },
      },
    },
  })
}

const randomColor = function (opacity) {
  return `rgba(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${opacity || '.3'})`
}

/* ======= Sampling functions ======= */

/**
 * sampleExponential - Function that return a random sample from an exponential
 * distribution of the form
 *    P(x,lambda) = lambda * exp (-lambda*x)
 *
 * With the rate parameter lambda = 1 / mean
 *
 * @param {number} [mean=1]     Mean of the distribution
 * @param {null}   [min=null]   Min value returned
 * @param {null}   [max=null]   Max value returned
 * @param {null}   [jitter=null] If max or min value reached, to avoid a heap up on the boundaries. If null, default to 5% of mean.
 * @param {array}  [pWindow=[]] Window to restrict the probability default to [0.001,0.999]
 *
 * @returns {numeric} Sample value
 */
const sampleExponential = function (mean = 1, min = null, max = null, jitter = null, pWindow = [0.001, 0.999]) {
  const p = math.random(pWindow[0], pWindow[1])
  const lambda = 1 / mean
  // p = math.min(Math.max(p, ), );
  jitter = jitter === null ? mean * 0.05 : jitter

  let sample = (-Math.log(1 - p) / lambda)

  sample = min === null ? sample : Math.max(sample, min + (Math.random() * jitter))
  sample = max === null ? sample : Math.min(sample, max - (Math.random() * jitter))

  // Consider p as the CDF to return a sample value
  return sample
}

export { sampleExponential,
  randomColor,
  getDensity,
  vectorToPosition,
  positionToVector,
  getAspectRatio,
}

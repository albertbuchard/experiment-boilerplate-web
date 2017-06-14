import _ from 'lodash'
import BABYLON from 'experiment-babylon-js'
import {
  Array, // eslint-disable-line
  String, // eslint-disable-line
} from 'experiment-js'


/* =============== Main scene =============== */
export default function ThreeDScene(options = {}) {
  // option base
  const optionsBase = {
    sceneKey: 'threeD',
    clearColor: new BABYLON.Color4(0, 0, 0, 1),
  }

  options = _.extend(optionsBase, options)

  /* --- Get taskObject from context --- */
  const taskObject = this.taskObject

  const scene = new BABYLON.Scene(taskObject.engine)

  /**
     * Holds the scenekey inside the scene object.
     * @type {string}
     */
  scene.sceneKey = options.sceneKey

    /**
     * Reference to the parent taskObject
     * @type {TaskObject}
     */
  scene.parentTaskObject = this

    /* --- Add a stateManager --- */
  taskObject.addStateManager(scene)

  scene.updateContentFrame = () => {}

    /**
     * Custom resize functions called by updateContentFrame. Can be set by the user
     * to perform scene updates on resize. Can be an array of function or a single function.
     * @type {!function|array}
     */
  scene.onResize = null

    /* Scene update */
  scene.registerBeforeRender(() => {
    scene.stateManager.update()
  })


    // This creates and positions a free camera (non-mesh)
  const camera = new BABYLON.ArcRotateCamera('camera1', 0, 1.05, 25, new BABYLON.Vector3(0, 0, 0), scene)
  camera.setTarget(BABYLON.Vector3.Zero())
  camera.lowerRadiusLimit = 5
  camera.upperRadiusLimit = 80
  camera.upperBetaLimit = Math.PI / 2
  camera.attachControl(taskObject.canvas, true)
  scene.initialCamera = camera

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new BABYLON.PointLight('light1', new BABYLON.Vector3(0, -1, 0), scene)
  light.position = new BABYLON.Vector3(-3, 5, -3) // only Y is not updated in render
  light.intensity = 0.95
  light.diffuse = new BABYLON.Color3(1, 0, 0)
  light.specular = new BABYLON.Color3(1, 1, 1)

  const lightSphere = BABYLON.Mesh.CreateSphere('sphere1', 30, 0.5, scene)
  const litMaterial = new BABYLON.StandardMaterial('litMat', this.scene)
  litMaterial.emissiveColor = BABYLON.Color3.FromInts(255, 300, 150)
  lightSphere.material = litMaterial


    // Lights
  const light0 = new BABYLON.PointLight('light5', new BABYLON.Vector3(0, -1, 0), scene)
  const light1 = new BABYLON.PointLight('Omni1', new BABYLON.Vector3(0, -1, 0), scene)
  const light2 = new BABYLON.PointLight('Omni2', new BABYLON.Vector3(0, -1, 0), scene)
  const light3 = new BABYLON.PointLight('Dir0', new BABYLON.Vector3(0, -1, 0), scene)
  const light4 = new BABYLON.PointLight('Omni3', new BABYLON.Vector3(0, -1, 0), scene)
  const light5 = new BABYLON.PointLight('Omni4', new BABYLON.Vector3(0, -1, 0), scene)

    // Creating light sphere
  const lightSphere0 = BABYLON.Mesh.CreateSphere('Sphere0', 16, 0.5, scene)
  const lightSphere1 = BABYLON.Mesh.CreateSphere('Sphere1', 16, 0.5, scene)
  const lightSphere2 = BABYLON.Mesh.CreateSphere('Sphere2', 16, 0.5, scene)
  const lightSphere4 = BABYLON.Mesh.CreateSphere('Sphere4', 16, 0.5, scene)
  const lightSphere5 = BABYLON.Mesh.CreateSphere('Sphere5', 16, 0.5, scene)

  lightSphere0.material = new BABYLON.StandardMaterial('red', scene)
    // lightSphere0.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    // lightSphere0.material.specularColor = new BABYLON.Color3(0, 0, 0);
  lightSphere0.material.emissiveColor = new BABYLON.Color3(1, 0, 0)
  light0.intensity = 0.95

  lightSphere1.material = new BABYLON.StandardMaterial('green', scene)
  lightSphere1.material.diffuseColor = new BABYLON.Color3(0, 1, 0)
  lightSphere1.material.specularColor = new BABYLON.Color3(0, 1, 0)
  lightSphere1.material.emissiveColor = new BABYLON.Color3(0, 1, 0)

  lightSphere2.material = new BABYLON.StandardMaterial('blue', scene)
  lightSphere2.material.diffuseColor = new BABYLON.Color3(0, 0, 1)
  lightSphere2.material.specularColor = new BABYLON.Color3(0, 0, 0)
  lightSphere2.material.emissiveColor = new BABYLON.Color3(0, 0, 1)

  lightSphere4.material = new BABYLON.StandardMaterial('blue', scene)
  lightSphere4.material.diffuseColor = new BABYLON.Color3(0, 0, 0)
  lightSphere4.material.specularColor = new BABYLON.Color3(0, 0, 0)
  lightSphere4.material.emissiveColor = new BABYLON.Color3(1, 1, 0)

  lightSphere5.material = new BABYLON.StandardMaterial('blue', scene)
  lightSphere5.material.diffuseColor = new BABYLON.Color3(0, 0, 0)
  lightSphere5.material.specularColor = new BABYLON.Color3(0, 0, 0)
  lightSphere5.material.emissiveColor = new BABYLON.Color3(0, 1, 1)


    // Lights colors
  light0.diffuse = new BABYLON.Color3(1, 0, 0)
  light0.specular = new BABYLON.Color3(1, 0, 0)

  light1.diffuse = new BABYLON.Color3(0, 1, 0)
  light1.specular = new BABYLON.Color3(0, 1, 0)

  light2.diffuse = new BABYLON.Color3(0, 0, 1)
  light2.specular = new BABYLON.Color3(0, 0, 1)

  light3.diffuse = new BABYLON.Color3(1, 1, 1)
  light3.specular = new BABYLON.Color3(1, 1, 1)

  light4.diffuse = new BABYLON.Color3(1, 1, 0)
  light4.specular = new BABYLON.Color3(1, 1, 0)

  light5.diffuse = new BABYLON.Color3(0, 1, 1)
  light5.specular = new BABYLON.Color3(0, 1, 1)


    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
  const sphere = BABYLON.Mesh.CreateSphere('sphere1', 150, 2, scene)
  sphere.position.y = 1

  const sphere2 = BABYLON.Mesh.CreateSphere('sphere2', 150, 2, scene)
  sphere2.position.y = 1
  sphere2.position.z = 3

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
  const ground = BABYLON.Mesh.CreateGround('ground1', 60, 60, 2, scene)

  const shadowGenerator = new BABYLON.ShadowGenerator(1024, light)
  light.shadowMinZ = 1
  light.shadowMaxZ = 2500
  shadowGenerator.depthScale = 2500
  shadowGenerator.bias = 0.001
  shadowGenerator.getShadowMap().renderList.push(sphere)
  shadowGenerator.getShadowMap().renderList.push(sphere2)
  shadowGenerator.getShadowMap().refreshRate = 1
  shadowGenerator.forceBackFacesOnly = true

  const shadowGenerator2 = new BABYLON.ShadowGenerator(1024, light0)
  shadowGenerator2.bias = 0.001
  shadowGenerator2.getShadowMap().renderList.push(sphere)
  shadowGenerator2.getShadowMap().renderList.push(sphere2)
  shadowGenerator2.getShadowMap().refreshRate = 1
  shadowGenerator2.forceBackFacesOnly = true


  ground.receiveShadows = true
  const matt = new BABYLON.StandardMaterial('texture1', scene)
  matt.maxSimultaneousLights = 16
  matt.specularPower = 10000
  matt.backFaceCulling = false
  ground.material = matt
  ground.position.y = -1

  scene.clearColor = new BABYLON.Color4(0.5, 0.8, 1, 1)

    // Animations
  let alpha = 0
  let radiansFromCameraForShadows = -3 * (Math.PI / 4)
  let beta = 0

  scene.beforeRender = function () {
        // light rotates with ground
    light.position.x = Math.cos(camera.alpha + radiansFromCameraForShadows) * 2
    light.position.z = Math.sin(camera.alpha + radiansFromCameraForShadows) * 2
    radiansFromCameraForShadows += 0.015
    lightSphere.position.copyFrom(light.position)

    light0.position = new BABYLON.Vector3(10 * Math.sin(alpha), 0, 10 * Math.cos(alpha))
    light1.position = new BABYLON.Vector3(10 * Math.sin(alpha), 0, -10 * Math.cos(alpha))
    light2.position = new BABYLON.Vector3(10 * Math.cos(alpha), 0, 10 * Math.sin(alpha))
    light4.position = new BABYLON.Vector3(10 * Math.cos(alpha), 10 * Math.sin(alpha), 0)
    light5.position = new BABYLON.Vector3(10 * Math.sin(alpha), -10 * Math.cos(alpha), 0)

    light0.intensity = 0.5 + (Math.cos(beta * 0.9) * 0.5)
    light1.intensity = 0.5 + (Math.cos(beta * 0.8) * 0.5)
    light2.intensity = 0.5 + (Math.cos(beta * 1.1) * 0.5)
    light3.intensity = 0.5 + (Math.cos(beta * 1.2) * 0.5)


    lightSphere0.position = light0.position
    lightSphere1.position = light1.position
    lightSphere2.position = light2.position
    lightSphere4.position = light4.position
    lightSphere5.position = light5.position

    alpha += 0.01
    beta += 0.1
  }

  return scene
}

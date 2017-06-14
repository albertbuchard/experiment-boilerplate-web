// @flow

/*
 *  The Loading scene loads any ressource you need, with a little loading screen
 * It is optional to specify it - if you dont the framework creates one and load the assets
 */

 import BABYLON from 'experiment-babylon-js'

/* =============== Loading =============== */

 export default function LoadingScene(options: Object = {}) {
  /* --- Get taskObject from context --- */
   const taskObject = this.taskObject

  /* --- Create a basic 2D scene using a Canvas2D as background --- */
   const scene = taskObject.create2DScene(options)

  // /* --- Load assets --- */
   const assetObject = {
     adventurer: '/assets/sprites/adventurer/player.png',
   }


   // This line is important
   // NOTE In might be better to make it automatic if the user did not enter it, we'll see
   scene.loadingPromise = taskObject.loadAssets(assetObject, scene)
    .then(() => {
      const canvas = new BABYLON.ScreenSpaceCanvas2D(scene, { // eslint-disable-line
        id: 'ScreenCanvas',
        // size: this.renderSize,
        children: [new BABYLON.Text2D('Content loaded', {
          id: 'text',
          marginAlignment: 'h: center, v:center',
          fontName: '40pt Gill Sans',
        })],
      })
    })

   return scene
 }

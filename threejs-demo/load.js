import * as THREE from '../../libs/three.weapp.js'
import getMTLLoader from '../../jsm/loaders/MTLLoader.js';
import getOBJLoader from '../../jsm/loaders/OBJLoader.js';

const requestAnimationFrame = function (callback) {
  setTimeout(callback, 1000 / 60);
};

export default function (canvas) {
  let {
    MTLLoader
  } = getMTLLoader(THREE);
  let OBJLoader = getOBJLoader(THREE);

  // const canvas = wx.createCanvas()
  const gl = canvas.getContext('webgl')

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 1, 2000);
  camera.position.z = 450;

  const mtlLoader = new MTLLoader()
  mtlLoader.load('https://636c-cloud1-2g7vv46xd92e2e94-1317172100.tcb.qcloud.la/3D/IronMan.mtl?sign=d25d4d6933c0f6e85e87dad1bb7b0608&t=1678979250', materials => {
    materials.preload()
    const objLoader = new OBJLoader()
    objLoader.setMaterials(materials)
    objLoader.load('https://636c-cloud1-2g7vv46xd92e2e94-1317172100.tcb.qcloud.la/3D/IronMan.obj?sign=e985b3569342ad25a076372e6299506a&t=1678978204', obj => {
      scene.add(obj)
    })
  })

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    context: gl
  })
  renderer.setSize(canvas.width, canvas.height)

  function animate(requestAnimationFrame) {
    setTimeout(function () {
      requestAnimationFrame(function () {
        animate(requestAnimationFrame);
      });
      renderer.render(scene, camera);
    }, 1000 / 60);
  }
  animate(requestAnimationFrame)
}
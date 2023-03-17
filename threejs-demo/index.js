import * as THREE from '../../libs/three.weapp.js'
import loadObj from './load'

Page({
  onLoad(options) {
    wx.createSelectorQuery()
      .select('#c')
      .node()
      .exec((res) => {
        const canvas = new THREE.global.registerCanvas(res[0].node)

        loadObj(canvas)
      })
  },
})
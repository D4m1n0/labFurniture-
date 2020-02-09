import React from 'react';
import * as THREE from 'three';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
const OrbitControls = require('three-orbit-controls')(THREE);

export default class Furniture extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const width = window.innerWidth/2;
    const height = window.innerHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, width / height, 1, 1000 );
    this.camera.position.z = 2;
    this.camera.position.y = 2;
    this.camera.position.x = 2;
    this.controls = new OrbitControls(this.camera);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor('#303d57');
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);
    this.light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    this.scene.add(this.light)

    const loader = new ColladaLoader()

    loader.load('../assets/vestre-table.dae', (gltf) => {
      console.log(gltf);
      this.scene.add(gltf.scene)
    }, undefined, (err) => {
      console.error(err)
    })

    const geometry = new THREE.BoxGeometry(50, 0.01, 50);
    const material = new THREE.MeshBasicMaterial({ color: 0x363636 })
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)
    this.start();
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  };

  animate = () => {
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <div id="container">
        <div ref={mount => { this.mount = mount }} />
      </div>
    );
  }
}

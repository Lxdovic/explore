import { THREE, FBXLoader, GLTFLoader, DRACOLoader, PLYLoader } from './imports.js'

const GLTF = new GLTFLoader()
const FBX = new FBXLoader()
const DRACO = new DRACOLoader()
const PLY = new PLYLoader()

function LoadModel(path, scale, pos, rot) {
    return new Promise((resolve, reject) => {
        if (path.endsWith('.glb')) {
            DRACO.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/')
            GLTF.setDRACOLoader(DRACO)
            GLTF.load(path, gltf => {

                gltf.scene.traverse(function (child) { if (child.isMesh) {
                    child.castShadow = true
                    child.receiveShadow = true
                } })
    
                if (scale) { gltf.scene.scale.set(scale.x, scale.y, scale.z) }
                if (pos) { gltf.scene.position.set(pos.x, pos.y, pos.z) }
                if (rot) { gltf.scene.rotation.set(rot.x, rot.y, rot.z) }
                
                resolve(gltf.scene)
            })
        }

        else if (path.endsWith('.gltf')) {
            GLTF.load( path, gltf => {

                gltf.scene.traverse(function (child) { if (child.isMesh) {
                    child.castShadow = true
                    child.receiveShadow = true
                } })
    
                if (scale) { gltf.scene.scale.set(scale.x, scale.y, scale.z) }
                if (pos) { gltf.scene.position.set(pos.x, pos.y, pos.z) }
                if (rot) { gltf.scene.rotation.set(rot.x, rot.y, rot.z) }
                
                resolve(gltf.scene)
                
            }, undefined, err => { reject(err) })
        }
        
        else if (path.endsWith('.fbx')) {
            FBX.load(path, object => {
                object.traverse(function (child) { if (child.isMesh) { child.castShadow = true } })

                if (pos) { object.position.set(pos.x, pos.y, pos.z) }
                if (scale) { object.scale.set(scale.x, scale.y, scale.z) }

                resolve(object)
            }, undefined, err => { reject(err) })
        }

        else if (path.endsWith('.ply')) {
            PLY.load(path, geometry => {

                geometry.computeVertexNormals();

                const material = new THREE.MeshStandardMaterial( { color: 0x0055ff, flatShading: true } );
                const mesh = new THREE.Mesh( geometry, material );

                resolve(mesh)
            } );
        }

        else { reject('Wrong modle extension, please use .fbx or .gltf') }
    })
}

export { LoadModel }
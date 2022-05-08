import * as THREE from 'https://cdn.skypack.dev/three@0.128.0'
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/FBXLoader.js'
import { DRACOLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/DRACOLoader.js'
import { PLYLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/PLYLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js'
import { TransformControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/TransformControls.js'
import { EffectComposer } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/UnrealBloomPass.js'
import { HalftonePass } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/HalftonePass.js'
import { ColorCorrectionShader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/shaders/ColorCorrectionShader.js'
import { OutlinePass } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/OutlinePass.js';
import { ShaderPass } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/postprocessing/ShaderPass.js';
import { CopyShader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/shaders/CopyShader.js';
import { FXAAShader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/shaders/FXAAShader.js';
import * as dat from 'https://cdn.skypack.dev/dat.gui';


export {
    THREE,
    GLTFLoader,
    FBXLoader,
    DRACOLoader,
    PLYLoader,
    OrbitControls,
    TransformControls,
    EffectComposer,
    RenderPass,
    UnrealBloomPass, 
    ShaderPass,
    CopyShader,
    FXAAShader,
    HalftonePass,
    ColorCorrectionShader,
    OutlinePass,
    dat
}
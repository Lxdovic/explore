import { THREE, EffectComposer, RenderPass, UnrealBloomPass, ColorCorrectionShader, ShaderPass } from './imports.js'
import { LoadModel } from './loaders.js'

let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, .01, 100000)
let renderer = new THREE.WebGLRenderer({antialias: true, powerPreference: 'high-performance'})
let composer = new EffectComposer(renderer)

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setSize(window.innerWidth, window.innerHeight)
composer.setSize(window.innerWidth, window.innerHeight)
renderer.toneMapping = THREE.ACESFilmicToneMapping

document.getElementById('screen').appendChild(renderer.domElement)
    
composer.addPass(new RenderPass(scene, camera))
// composer.addPass(new ShaderPass(ColorCorrectionShader))
composer.addPass(new UnrealBloomPass({x: 1024, y: 1024}, 2, .9, .1))

scene.background = new THREE.Color(0, 0, 0.1)

let curve = new THREE.CatmullRomCurve3(
    [new THREE.Vector3(-13861.582624356455, 13368.423813738054, 18918.4136048625),
	new THREE.Vector3(-10767.852072329624, 9554.936770799317, 16467.73679964254),
	new THREE.Vector3(-7997.828371679057, 13541.266248111046, 10127.463772994592),
	new THREE.Vector3(2636.797992360007, 15936.42609994315, 2542.0025618465634),
	new THREE.Vector3(1765.208287306184, 15962.522989014338, -3438.3018287076275),
	new THREE.Vector3(3320.8002466389817, 13476.572613494138, -7566.252660850135),
	new THREE.Vector3(8018.613692100294, 11960.070228652625, -10158.71319389078)]
)

curve.curveType = 'catmullrom'

let animation = {amount: 0, _length: 2000, forward: 20}
let pathTarget = new THREE.Vector3(0,0,0)
let cameraTarget = new THREE.Vector3(0,0,0)

document.body.onload = async () => {
    let model = await LoadModel('./assets/models/two/scene.gltf', new THREE.Vector3(4000, 4000, 4000))

    scene.add(model)

    let loader = {opacity: 1}

    

    new TWEEN.Tween(loader)
        .to({opacity: 0}, 1000)
        .onUpdate(x => {$('#loader').css({opacity: x.opacity})})
        .start()
        .onComplete(() => {
            $(document.body).css({overflow: 'auto'}); 
            gsap.registerPlugin(ScrollTrigger)
        
            gsap.timeline({
                scrollTrigger: {
                    trigger: "#screen",
                    pin: true,
                    start: "top top",
                    scrub: 2,
                    end: "+=6000",
                }
            }).to(animation, {amount: animation._length - animation.forward - 1, duration: 13, ease:"none"})
                
            let timeline = gsap.timeline()
                .to('#scroll', {duration: 1, opacity: 0})
                .from('#timeline-1', {duration: 1, opacity: 1}).to('#timeline-1', {duration: 1, opacity: 0})
                .from('#timeline-2', {duration: 1, opacity: 0}).to('#timeline-2', {duration: 2, opacity: 1}).to('#timeline-2', {duration: 1, opacity: 0})
                .from('#timeline-3', {duration: 1, opacity: 0}).to('#timeline-3', {duration: 2, opacity: 1}).to('#timeline-3', {duration: 1, opacity: 0})
                .from('#panel-1', {duration: 1, opacity: 0, pointerEvents: 'none'}).to('#panel-1', {duration: 1, opacity: 1, pointerEvents: 'auto'})
        
        
            render()
        
            function render() {
                requestAnimationFrame(render)
        
                curve.getPoint((animation.amount / animation._length) % 1.0, pathTarget)
                curve.getPoint(((animation.amount + animation.forward) / animation._length) % 1.0, cameraTarget)
                camera.position.copy(pathTarget)
                camera.lookAt(cameraTarget)
        
                timeline.time(animation.amount / animation._length * 13)
                          
                composer.render()
            }
        })
}

jQuery(document).ready(function() {
    let cursor = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        xp: 0,
        yp: 0,
        opacity: 0,
        smoothing: 20,
        current: 0,
        last_top: 0,
        tween: {},
        timeout: {}
    }
     
    $(document).mousemove(e => {
        cursor.x = e.clientX - 20
        cursor.y = e.clientY - 20
        cursor.smoothing = 20
        cursor.timeout = setTimeout(() => {
            cursor.tween = new TWEEN.Tween(cursor)
                .to({opacity: 0}, 340)
                .onUpdate((x) => {$('#cursor').css({opacity: x.opacity})})
                .start()
                
            cursor.current = 0
        }, 400)

        if (cursor.current) return

        cursor.current = 1

        cursor.tween = new TWEEN.Tween(cursor)
            .to({opacity: 1}, 400)
            .onUpdate((x) => {$('#cursor').css({opacity: x.opacity})})
            .start()
    })

    setInterval(() => {
        TWEEN.update()
        cursor.xp += ((cursor.x - cursor.xp)/cursor.smoothing)
        cursor.yp += ((cursor.y - cursor.yp)/cursor.smoothing)
        $('#cursor').css({left: cursor.xp +'px', top: cursor.yp +'px'})
    })
})

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    composer.setSize( window.innerWidth, window.innerHeight );

}
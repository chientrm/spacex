<script lang="ts">
	// @ts-ignore
	import Disc from '$lib/assets/disc.png?webp';
	// @ts-ignore
	import Earth from '$lib/assets/earth_map_BW.png?w=1536&webp&flatten?grayscale';
	import glowFrag from '$lib/assets/glow.frag?raw';
	import glowVert from '$lib/assets/glow.vert?raw';
	import { frameLoop } from '$lib/utils';
	import { onMount } from 'svelte';
	import {
		AdditiveBlending,
		AmbientLight,
		BufferGeometry,
		Color,
		Float32BufferAttribute,
		FrontSide,
		Mesh,
		MeshBasicMaterial,
		MeshPhongMaterial,
		PerspectiveCamera,
		Points,
		PointsMaterial,
		Raycaster,
		Scene,
		ShaderMaterial,
		SphereGeometry,
		TextureLoader,
		WebGLRenderer
	} from 'three';
	// @ts-ignore
	import { Text } from 'troika-three-text';
	import { OrbitControls } from './OrbitControls';

	export let starlinks: IndexDTO.Starlink[];
	let canvas: HTMLCanvasElement;
	const GLOBE_SIZE = 170;
	let value: string;
	let mouse = { x: 0, y: 0 };

	onMount(() => {
		const isMobile = !window.matchMedia('(min-width: 768px)').matches;
		const renderer = new WebGLRenderer({
			canvas,
			alpha: true
		});
		if (!isMobile) renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(canvas.width, canvas.width);
		const camera = new PerspectiveCamera(45, 1, 1, 10000);
		camera.position.z = 500;
		const control = new OrbitControls(camera, renderer.domElement);
		control.enableDamping = true;
		const scene = new Scene();
		scene.add(new AmbientLight(0xffffff, 0.8));

		const raycaster = new Raycaster();
		raycaster.params.Points = { threshold: 3 };

		const starlinkPositions = starlinks.map((starlink) => {
			const { lat, lng, alt } = starlink;
			const cosLat = Math.cos((lat * Math.PI) / 180.0);
			const sinLat = Math.sin((lat * Math.PI) / 180.0);
			const cosLng = Math.cos((lng * Math.PI) / 180.0);
			const sinLng = Math.sin((lng * Math.PI) / 180.0);
			const rad = GLOBE_SIZE * (1 + alt);
			return [-rad * cosLat * cosLng, rad * sinLat, rad * cosLat * sinLng];
		});

		const loader = new TextureLoader();
		loader.load(Earth, (earth) => {
			const geometry = new SphereGeometry(GLOBE_SIZE, 40, 40);
			const globe = new Mesh(geometry, new MeshPhongMaterial({ map: earth }));
			globe.rotateY(-Math.PI);
			scene.add(globe);
			const glowMat = new ShaderMaterial({
				uniforms: {
					c: { value: 0.02 },
					p: { value: 2.5 },
					glowColor: { value: new Color(0xff524a) },
					viewVector: { value: camera.position }
				},
				vertexShader: glowVert,
				fragmentShader: glowFrag,
				side: FrontSide,
				blending: AdditiveBlending
			});
			const glow = new Mesh(geometry, glowMat);
			glow.scale.multiplyScalar(1.02);
			scene.add(glow);
		});

		let satelites: Points;
		loader.load(Disc, (disc) => {
			const pointGeometries = new BufferGeometry();
			pointGeometries.setAttribute(
				'position',
				new Float32BufferAttribute(starlinkPositions.flat(), 3)
			);
			const pointMat = new PointsMaterial({
				size: 10,
				map: disc,
				color: 0x00adb5,
				alphaTest: 0.5
			});
			satelites = new Points(pointGeometries, pointMat);
			scene.add(satelites);
		});

		const marker = new Mesh(
			new SphereGeometry(5, 20, 20),
			new MeshBasicMaterial({ color: 0x393e46 })
		);
		scene.add(marker);

		const caption = new Text();
		caption.fontSize = 10;
		caption.color = 0x222831;
		caption.font = '/fonts/D-DIN-Bold.woff';
		caption.anchorY = -18;
		caption.material.depthTest = false;
		scene.add(caption);

		canvas.addEventListener(
			'mousemove',
			(e) => {
				e.preventDefault();
				const rect = canvas.getBoundingClientRect();
				mouse = {
					x: ((e.clientX - rect.left) / canvas.clientWidth) * 2 - 1,
					y: -((e.clientY - rect.top) / canvas.clientWidth) * 2 + 1
				};
			},
			false
		);

		const stopLoop = frameLoop(() => {
			control.update();
			if (satelites) {
				raycaster.setFromCamera(mouse, camera);
				const intersects = raycaster
					.intersectObjects(scene.children)
					.filter((intersect) => intersect.object === satelites);
				if (intersects.length > 0) {
					const { index } = intersects[0];
					const i = index || 0;
					// @ts-ignore
					caption.text = starlinks[index].name;
					// @ts-ignore
					const a = intersects[0].object.geometry.attributes.position.array;
					marker.position.set(a[i * 3], a[i * 3 + 1], a[i * 3 + 2]);
					caption.position.set(a[i * 3], a[i * 3 + 1], a[i * 3 + 2]);
					const camRot = camera.rotation;
					caption.rotation.set(camRot.x, camRot.y, camRot.z);
				} else value = 'undefined';
			}
			renderer.render(scene, camera);
		});

		return () => {
			stopLoop();
			renderer.dispose();
		};
	});
</script>

<canvas bind:this={canvas} />

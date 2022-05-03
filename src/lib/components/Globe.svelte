<script lang="ts">
	import Disc from '$lib/assets/disc.png';
	// @ts-ignore
	import Earth from '$lib/assets/earth-blue-marble.jpeg?w=1024&webp&flatten';
	import { frameLoop } from '$lib/utils';
	import { onMount } from 'svelte';
	import {
		AmbientLight,
		BufferGeometry,
		DirectionalLight,
		Float32BufferAttribute,
		Mesh,
		MeshPhongMaterial,
		PerspectiveCamera,
		Points,
		PointsMaterial,
		Raycaster,
		Scene,
		SphereGeometry,
		TextureLoader,
		WebGLRenderer
	} from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

	export let starlinks: IndexDTO.StarLink[];
	let canvas: HTMLCanvasElement;
	const GLOBE_SIZE = 170;
	let value: string;

	onMount(() => {
		const renderer = new WebGLRenderer({
			canvas,
			alpha: true,
			antialias: true
		});
		renderer.setSize(400, 400);
		renderer.setPixelRatio(window.devicePixelRatio);
		const camera = new PerspectiveCamera(45, 1, 1, 10000);
		camera.position.z = 500;
		const control = new OrbitControls(camera, renderer.domElement);
		control.enableDamping = true;
		const scene = new Scene();
		scene.add(new AmbientLight(0xffffff, 0.8));
		scene.add(new DirectionalLight(0xffffff, 0.2));

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
		// loader.load(Earth, (texture) => {
		// 	const geomtry = new SphereGeometry(GLOBE_SIZE, 40, 40);
		// 	const material = new MeshPhongMaterial({ map: texture });
		// 	const mesh = new Mesh(geomtry, material);
		// 	mesh.rotateY(-Math.PI);
		// 	scene.add(mesh);
		// });

		let points: Points;
		loader.load(Disc, (texture) => {
			const dots = new BufferGeometry();
			dots.setAttribute(
				'position',
				new Float32BufferAttribute(starlinkPositions.flat(), 3)
			);
			const dotMaterial = new PointsMaterial({
				size: 10,
				map: texture,
				color: 0xffff00,
				alphaTest: 0.5
			});
			points = new Points(dots, dotMaterial);
			scene.add(points);
		});

		let marker: Mesh;
		{
			const geometry = new SphereGeometry(10, 5, 5);
			const material = new MeshPhongMaterial();
			marker = new Mesh(geometry, material);
			scene.add(marker);
		}

		const mouse = { x: 0, y: 0 };
		canvas.addEventListener(
			'mousemove',
			(e) => {
				e.preventDefault();
				mouse.x = (e.clientX - canvas.getBoundingClientRect().left) / 200 - 1;
				mouse.y = (e.clientY - canvas.getBoundingClientRect().top) / 200 - 1;
			},
			false
		);

		const stopLoop = frameLoop(() => {
			control.update();
			if (points) {
				raycaster.setFromCamera(mouse, camera);
				const intersects = raycaster
					.intersectObjects(scene.children)
					.filter((intersect) => intersect.object === points);
				if (intersects.length > 0) {
					console.log(intersects[0]);
					const { index } = intersects[0];
					const i = index || 0;
					// @ts-ignore
					value = starlinks[index].name;
					// @ts-ignore
					const array = intersects[0].object.geometry.attributes.position.array;
					marker.position.set(
						array[i * 3],
						-array[i * 3 + 1],
						array[i * 3 + 2]
					);
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
<span>{value}</span>

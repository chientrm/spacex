import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { imagetools } from 'vite-imagetools'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
			scss: {
				prependData: '@use "src/variables.scss" as *;'
			}
		})
	],
	kit: {
		adapter: adapter(),
		vite: {
			server: {
				hmr: process.env.GITPOD_WORKSPACE_URL
					? {
						host: process.env.GITPOD_WORKSPACE_URL.replace(
							'https://',
							'3000-'
						),
						protocol: 'wss',
						clientPort: 443
					}
					: true
			},

			define: { __version__: JSON.stringify(process.env.TAG || 'development') },
			css: {
				preprocessorOptions: {
					scss: {
						additionalData: '@use "src/variables.scss" as *;'
					}
				}
			},
			plugins: [imagetools()]
		}
	}
};

export default config;

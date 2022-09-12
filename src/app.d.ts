// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		is_mobile: boolean;
	}
	// interface PageData {}
	// interface PageError {}
	// interface Platform {}
}

declare namespace Data {
	interface Launch {
		id: string;
		name: string;
		date_unix: number;
		date_utc: string;
		upcoming: boolean;
		links: {
			patch: {
				small?: string;
			};
		};
		details?: string;
		sucess?: boolean;
	}
	interface Starlink {
		spaceTrack: {
			OBJECT_NAME: string;
		};
		latitude?: number;
		longitude?: number;
		height_km?: number;
	}
}

declare module '*?webp' {
	const value: any;
	export default value;
}

declare module '*&webp' {
	const value: any;
	export default value;
}

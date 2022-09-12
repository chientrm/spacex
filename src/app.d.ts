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
			youtube_id?: string;
			reddit: {
				campaign?: string;
				recovery?: string;
				media?: string;
				launch?: string;
			};
			presskit?: string;
			article?: string;
			wikipedia?: string;
			flickr: {
				original: string[];
			};
		};
		capsules: string[];
		details?: string;
		success?: boolean;
		launchpad?: string;
		rocket?: string;
		crew: string[];
		ships: string[];
		capsules: string[];
		payloads: string[];
	}
	interface Starlink {
		spaceTrack: {
			OBJECT_NAME: string;
		};
		latitude?: number;
		longitude?: number;
		height_km?: number;
	}
	interface Launchpad {
		name?: string;
		full_name?: string;
	}
	interface Rocket {
		name: string;
	}
	interface Payload {
		name?: string;
	}
	interface Capsule {
		serial: string;
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

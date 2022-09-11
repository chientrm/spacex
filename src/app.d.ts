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
	}
}

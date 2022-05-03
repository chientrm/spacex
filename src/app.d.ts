/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

declare namespace Launch {
	export type Root = Root2[];

	export interface Root2 {
		fairings?: Fairings;
		links: Links;
		static_fire_date_utc?: string;
		static_fire_date_unix?: number;
		net: boolean;
		window?: number;
		rocket: string;
		success?: boolean;
		failures: Failure[];
		details?: string;
		crew: string[];
		ships: string[];
		capsules: string[];
		payloads: string[];
		launchpad: string;
		flight_number: number;
		name: string;
		date_utc: string;
		date_unix: number;
		date_local: string;
		date_precision: string;
		upcoming: boolean;
		cores: Core[];
		auto_update: boolean;
		tbd: boolean;
		launch_library_id?: string;
		id: string;
	}

	export interface Fairings {
		reused?: boolean;
		recovery_attempt?: boolean;
		recovered?: boolean;
		ships: string[];
	}

	export interface Links {
		patch: Patch;
		reddit: Reddit;
		flickr: Flickr;
		presskit?: string;
		webcast?: string;
		youtube_id?: string;
		article?: string;
		wikipedia?: string;
	}

	export interface Patch {
		small?: string;
		large?: string;
	}

	export interface Reddit {
		campaign?: string;
		launch?: string;
		media?: string;
		recovery?: string;
	}

	export interface Flickr {
		small: any[];
		original: string[];
	}

	export interface Failure {
		time: number;
		altitude?: number;
		reason: string;
	}

	export interface Core {
		core?: string;
		flight?: number;
		gridfins?: boolean;
		legs?: boolean;
		reused?: boolean;
		landing_attempt?: boolean;
		landing_success?: boolean;
		landing_type?: string;
		landpad?: string;
	}
}

declare namespace Rocket {
	export type Root = Root2[];

	export interface Root2 {
		height: Height;
		diameter: Diameter;
		mass: Mass;
		first_stage: FirstStage;
		second_stage: SecondStage;
		engines: Engines;
		landing_legs: LandingLegs;
		payload_weights: PayloadWeight[];
		flickr_images: string[];
		name: string;
		type: string;
		active: boolean;
		stages: number;
		boosters: number;
		cost_per_launch: number;
		success_rate_pct: number;
		first_flight: string;
		country: string;
		company: string;
		wikipedia: string;
		description: string;
		id: string;
	}

	export interface Height {
		meters: number;
		feet: number;
	}

	export interface Diameter {
		meters: number;
		feet: number;
	}

	export interface Mass {
		kg: number;
		lb: number;
	}

	export interface FirstStage {
		thrust_sea_level: ThrustSeaLevel;
		thrust_vacuum: ThrustVacuum;
		reusable: boolean;
		engines: number;
		fuel_amount_tons: number;
		burn_time_sec?: number;
	}

	export interface ThrustSeaLevel {
		kN: number;
		lbf: number;
	}

	export interface ThrustVacuum {
		kN: number;
		lbf: number;
	}

	export interface SecondStage {
		thrust: Thrust;
		payloads: Payloads;
		reusable: boolean;
		engines: number;
		fuel_amount_tons: number;
		burn_time_sec?: number;
	}

	export interface Thrust {
		kN: number;
		lbf: number;
	}

	export interface Payloads {
		composite_fairing: CompositeFairing;
		option_1: string;
	}

	export interface CompositeFairing {
		height: Height2;
		diameter: Diameter2;
	}

	export interface Height2 {
		meters?: number;
		feet?: number;
	}

	export interface Diameter2 {
		meters?: number;
		feet?: number;
	}

	export interface Engines {
		isp: Isp;
		thrust_sea_level: ThrustSeaLevel2;
		thrust_vacuum: ThrustVacuum2;
		number: number;
		type: string;
		version: string;
		layout?: string;
		engine_loss_max?: number;
		propellant_1: string;
		propellant_2: string;
		thrust_to_weight: number;
	}

	export interface Isp {
		sea_level: number;
		vacuum: number;
	}

	export interface ThrustSeaLevel2 {
		kN: number;
		lbf: number;
	}

	export interface ThrustVacuum2 {
		kN: number;
		lbf: number;
	}

	export interface LandingLegs {
		number: number;
		material?: string;
	}

	export interface PayloadWeight {
		id: string;
		name: string;
		kg: number;
		lb: number;
	}
}

declare namespace Starlink {
	export type Root = Root2[];

	export interface Root2 {
		spaceTrack: SpaceTrack;
		launch?: string;
		version?: string;
		height_km?: number;
		latitude?: number;
		longitude?: number;
		velocity_kms?: number;
		id: string;
	}

	export interface SpaceTrack {
		CCSDS_OMM_VERS: string;
		COMMENT: string;
		CREATION_DATE: string;
		ORIGINATOR: string;
		OBJECT_NAME: string;
		OBJECT_ID: string;
		CENTER_NAME: string;
		REF_FRAME: string;
		TIME_SYSTEM: string;
		MEAN_ELEMENT_THEORY: string;
		EPOCH: string;
		MEAN_MOTION: number;
		ECCENTRICITY: number;
		INCLINATION: number;
		RA_OF_ASC_NODE: number;
		ARG_OF_PERICENTER: number;
		MEAN_ANOMALY: number;
		EPHEMERIS_TYPE: number;
		CLASSIFICATION_TYPE: string;
		NORAD_CAT_ID: number;
		ELEMENT_SET_NO: number;
		REV_AT_EPOCH: number;
		BSTAR: number;
		MEAN_MOTION_DOT: number;
		MEAN_MOTION_DDOT: number;
		SEMIMAJOR_AXIS: number;
		PERIOD: number;
		APOAPSIS: number;
		PERIAPSIS: number;
		OBJECT_TYPE: string;
		RCS_SIZE?: string;
		COUNTRY_CODE?: string;
		LAUNCH_DATE?: string;
		SITE?: string;
		DECAY_DATE?: string;
		DECAYED: number;
		FILE: number;
		GP_ID: number;
		TLE_LINE0: string;
		TLE_LINE1: string;
		TLE_LINE2: string;
	}
}

declare namespace LaunchPad {
	export type Root = Root2[];

	export interface Root2 {
		images: Images;
		name: string;
		full_name: string;
		locality: string;
		region: string;
		latitude: number;
		longitude: number;
		launch_attempts: number;
		launch_successes: number;
		rockets: string[];
		timezone: string;
		launches: string[];
		status: string;
		details: string;
		id: string;
	}

	export interface Images {
		large: string[];
	}
}

declare namespace Rocket {
	export type Root = Root2[];

	export interface Root2 {
		height: Height;
		diameter: Diameter;
		mass: Mass;
		first_stage: FirstStage;
		second_stage: SecondStage;
		engines: Engines;
		landing_legs: LandingLegs;
		payload_weights: PayloadWeight[];
		flickr_images: string[];
		name: string;
		type: string;
		active: boolean;
		stages: number;
		boosters: number;
		cost_per_launch: number;
		success_rate_pct: number;
		first_flight: string;
		country: string;
		company: string;
		wikipedia: string;
		description: string;
		id: string;
	}

	export interface Height {
		meters: number;
		feet: number;
	}

	export interface Diameter {
		meters: number;
		feet: number;
	}

	export interface Mass {
		kg: number;
		lb: number;
	}

	export interface FirstStage {
		thrust_sea_level: ThrustSeaLevel;
		thrust_vacuum: ThrustVacuum;
		reusable: boolean;
		engines: number;
		fuel_amount_tons: number;
		burn_time_sec?: number;
	}

	export interface ThrustSeaLevel {
		kN: number;
		lbf: number;
	}

	export interface ThrustVacuum {
		kN: number;
		lbf: number;
	}

	export interface SecondStage {
		thrust: Thrust;
		payloads: Payloads;
		reusable: boolean;
		engines: number;
		fuel_amount_tons: number;
		burn_time_sec?: number;
	}

	export interface Thrust {
		kN: number;
		lbf: number;
	}

	export interface Payloads {
		composite_fairing: CompositeFairing;
		option_1: string;
	}

	export interface CompositeFairing {
		height: Height2;
		diameter: Diameter2;
	}

	export interface Height2 {
		meters?: number;
		feet?: number;
	}

	export interface Diameter2 {
		meters?: number;
		feet?: number;
	}

	export interface Engines {
		isp: Isp;
		thrust_sea_level: ThrustSeaLevel2;
		thrust_vacuum: ThrustVacuum2;
		number: number;
		type: string;
		version: string;
		layout?: string;
		engine_loss_max?: number;
		propellant_1: string;
		propellant_2: string;
		thrust_to_weight: number;
	}

	export interface Isp {
		sea_level: number;
		vacuum: number;
	}

	export interface ThrustSeaLevel2 {
		kN: number;
		lbf: number;
	}

	export interface ThrustVacuum2 {
		kN: number;
		lbf: number;
	}

	export interface LandingLegs {
		number: number;
		material?: string;
	}

	export interface PayloadWeight {
		id: string;
		name: string;
		kg: number;
		lb: number;
	}
}

declare namespace Payload {
	export type Root = Root2[];

	export interface Root2 {
		dragon: Dragon;
		name: string;
		type: string;
		reused: boolean;
		launch?: string;
		customers: string[];
		norad_ids: number[];
		nationalities: string[];
		manufacturers: string[];
		mass_kg?: number;
		mass_lbs?: number;
		orbit?: string;
		reference_system?: string;
		regime?: string;
		longitude?: number;
		semi_major_axis_km?: number;
		eccentricity?: number;
		periapsis_km?: number;
		apoapsis_km?: number;
		inclination_deg?: number;
		period_min?: number;
		lifespan_years?: number;
		epoch?: string;
		mean_motion?: number;
		raan?: number;
		arg_of_pericenter?: number;
		mean_anomaly?: number;
		id: string;
	}

	export interface Dragon {
		capsule?: string;
		mass_returned_kg?: number;
		mass_returned_lbs?: number;
		flight_time_sec?: number;
		manifest?: string;
		water_landing?: boolean;
		land_landing?: boolean;
	}
}

declare namespace Capsule {
	export type Root = Root2[];

	export interface Root2 {
		reuse_count: number;
		water_landings: number;
		land_landings: number;
		last_update?: string;
		launches: string[];
		serial: string;
		status: string;
		type: string;
		id: string;
	}
}

declare interface Link {
	href: string;
	title: string;
	caption: string;
}

declare namespace IndexDTO {
	interface Starlink {
		name: string;
		lat: number;
		lng: number;
		alt: number;
	}
	interface DTO {
		upcomingLaunches: {
			id: string;
			name: string;
			date: number;
		}[];
		starlinks: Starlink[];
	}
}

declare namespace LaunchesDTO {
	interface Launch {
		id: string;
		name: string;
		date: number;
		details?: string;
		logo?: string;
		upcoming: boolean;
	}
	interface DTO {
		launches: Launch[];
	}
}

declare namespace StarlinksDTO {
	interface Starlink {
		id: string;
		name: string;
		lastUpdate: number;
		launchId?: string;
		launchName?: string;
		decayed: boolean;
	}
	interface DTO {
		starlinks: Starlink[];
	}
}

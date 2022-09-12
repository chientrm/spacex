export default {
	HOME: '/',
	COMING_SOON: '/coming-soon',
	STARLINK: '/starlink',
	GITHUB_REPO: 'https://github.com/chientrm/spacex',
	LAUNCHES: {
		GET: '/launch',
		CURRENT: (current: number) => ({
			PAGE_SIZE: (pageSize: number) => ({
				UPCOMING: (upcoming: 'upcoming' | 'past' | 'all') => ({
					SORT: (sort: 'oldest' | 'latest', search: string | null = '') =>
						`/launch/current/${current}/pageSize/${pageSize}/upcoming/${upcoming}/sort/${sort}?search=${search}`
				})
			})
		})
	},
	LAUNCH: (id: string) => `/launch/${id}`,
	LAUNCHPAD: (id: string) => `/launchpad/${id}`,
	ROCKET: (id: string) => `/rocket/${id}`,
	CAPSULE: (id: string) => `/capsule/${id}`,
	PAYLOAD: (id: string) => `/payload/${id}`,
	YOUTUBE: (id: string) => `https://www.youtube.com/embed/${id}?autoplay=1`
};

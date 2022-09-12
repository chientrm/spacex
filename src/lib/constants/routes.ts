export default {
	HOME: '/',
	COMING_SOON: '/coming-soon',
	STARLINK: '/starlink',
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
	LAUNCH: (id: string) => `/launch/${id}`
};

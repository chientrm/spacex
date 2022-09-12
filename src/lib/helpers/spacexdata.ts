const get = <T>(uri: string) =>
		fetch(`https://api.spacexdata.com/v4${uri}`)
			.then(async (res) => {
				if (!res.ok) {
					const { status, statusText, url } = res,
						text = await res.text();
					throw new Error(JSON.stringify({ status, statusText, text, url }));
				}
				return res;
			})
			.then((res) => res.json<T>()),
	all_launches = () => get<Data.Launch[]>('/launches'),
	upcoming_launches = () => get<Data.Launch[]>('/launches/upcoming'),
	all_starlinks = () => get<Data.Starlink[]>('/starlink');

export { all_launches, upcoming_launches, all_starlinks };

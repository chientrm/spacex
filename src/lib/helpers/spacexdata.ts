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
	list_upcoming_launches = () => get<Data.Launch[]>('/launches/upcoming'),
	list_starlinks = () => get<Data.Starlink[]>('/starlink');

export { list_upcoming_launches, list_starlinks };

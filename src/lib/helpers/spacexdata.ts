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
	one_launch = (id: string) => get<Data.Launch>(`/launches/${id}`),
	all_starlinks = () => get<Data.Starlink[]>('/starlink'),
	one_launchpad = (id: string) => get<Data.Launchpad>(`/launchpads/${id}`),
	one_rocket = (id: string) => get<Data.Rocket>(`/rockets/${id}`),
	one_payload = (id: string) => get<Data.Payload>(`/payloads/${id}`),
	one_capsule = (id: string) => get<Data.Capsule>(`/capsules/${id}`);

export {
	all_launches,
	upcoming_launches,
	one_launch,
	all_starlinks,
	one_launchpad,
	one_rocket,
	one_capsule,
	one_payload
};

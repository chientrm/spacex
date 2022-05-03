import { encode, decode } from 'js-base64';

export const toBase64 = (o: any) => encode(JSON.stringify(o));

export const fromBase64 = <T>(s: string) => JSON.parse(decode(s)) as T;

export const truncate = (str: string, n: number, useWordBoundary = true) => {
	if (str.length <= n) {
		return str;
	}
	const subString = str.substr(0, n - 1); // the original check
	return (
		(useWordBoundary
			? subString.substr(0, subString.lastIndexOf(' '))
			: subString) + '...'
	);
};

export const frameLoop = (
	callback: (now: number, deltaTime: number) => void
) => {
	let request: number;
	let then: number;
	const animate = (now: number) => {
		then || (then = now);
		const deltaTime = now - then;
		then = now;
		callback(now / 1000, deltaTime / 1000);
		request = requestAnimationFrame(animate);
	};
	request = requestAnimationFrame(animate);
	return () => cancelAnimationFrame(request);
};
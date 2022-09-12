import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(timezone);

const date_format = ({
		date,
		tz,
		template
	}: {
		date: Date | string | number;
		tz: string;
		template: string;
	}) => dayjs.tz(date, tz).format(template),
	frame_loop = (callback: (now: number, deltaTime: number) => void) => {
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
	},
	truncate = (s: string, n: number) => {
		return s.length > n ? s.slice(0, n - 1) + '&hellip;' : s;
	},
	for_title = async (url: string | undefined) => {
		if (!url) return;
		const res = await fetch(url),
			text = await res.text(),
			titles = text.match(/<title>(.*?)<\/title>/),
			title = titles![1];
		return { url, title };
	},
	get_small_flickr = (url: string) => url.replace('_o.jpg', '_n.jpg');

export { date_format, frame_loop, truncate, for_title, get_small_flickr };

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
	};

export { date_format, frame_loop };

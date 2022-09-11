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
}) => dayjs.tz(date, tz).format(template);

export { date_format };

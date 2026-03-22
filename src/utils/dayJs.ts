import dayjs from "dayjs";
import AdvancedFormat from "dayjs/plugin/advancedFormat";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

dayjs.extend(AdvancedFormat);
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);

export default dayjs;

import dayjs from "dayjs";
import AdvancedFormat from "dayjs/plugin/advancedFormat";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(AdvancedFormat);
dayjs.extend(relativeTime);
dayjs.extend(duration);

export default dayjs;


import moment from "moment";

import { DISPLAY_DATE_FORMAT } from "../../constants";

export default function (pattern) {
    return function (value) {
        const pattern = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
        if (
            value === undefined ||
            (value.trim().length === 10 &&
                pattern.test(value) &&
                moment(value, DISPLAY_DATE_FORMAT).isValid())
        ) {
            return undefined;
        }

        return "Please enter a date in the format MM/YYYY";
    };
}

import * as _ from "lodash";
import { DISPLAY_DATE_FORMAT, SERVER_DATE_FORMAT } from "../constants";
import moment from "moment/moment";

export default function(values, fields) {
  const newValues = { ...values };
  _.each(fields, field => {
    const ftype = field.type.toLowerCase();

    if (ftype.indexOf("listitem") !== -1) {
      newValues[field.key] = newValues[field.key]
        ? parseInt(newValues[field.key], 0)
        : newValues[field.key];
    } else if (field.delete) {
      newValues[field.key] = undefined;
    } else {
      switch (ftype) {
        case "number":
        case "currency": {
          const value =
            !newValues[field.key] || !newValues[field.key].trim()
              ? undefined
              : newValues[field.key];
          if (!value) {
            newValues[field.key] = value;
          } else {
            const commasRemovedValue = newValues[field.key].replace(/,/g, "");
            newValues[field.key] = parseInt(commasRemovedValue, 0);
          }
          break;
        }
        case "date": {
          if (
            !newValues[field.key] ||
            !newValues[field.key].trim() ||
            newValues[field.key].indexOf("-") !== -1
          ) {
            newValues[field.key] = undefined;
          } else {
            newValues[field.key] = moment(
              newValues[field.key],
              DISPLAY_DATE_FORMAT
            ).format(SERVER_DATE_FORMAT);
          }
          break;
        }
        case "boolean":
          newValues[field.key] =
            newValues[field.key] === undefined
              ? null
              : newValues[field.key] === "true" ||
                newValues[field.key] === true;
          break;
        case "text": {
          
          newValues[field.key] =
            newValues[field.key] && newValues[field.key].toString().trim()
              ? newValues[field.key].toString().trim()
              : undefined;
          break;
        }
        default: {
          //return newValues;
        }
      }
    }
  });
  return newValues;
}

export const parseForDisplay = (type, value) => {
  if (!type) return value;
  switch (type.toLowerCase()) {
    case "currency": {
      return value
        ? value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        : value;
    }
    case "date": {
      return value && value.indexOf("-") !== -1
        ? moment(value, SERVER_DATE_FORMAT).format(DISPLAY_DATE_FORMAT)
        : value;
    }
    default:
      return value;
  }
};

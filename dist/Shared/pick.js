"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (obj, keys) => {
    const finalObj = {};
    console.log("here is", obj, keys);
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key];
            console.log("finalObj", finalObj);
        }
    }
    return finalObj;
};
exports.default = pick;

import { buttons_update } from "./button.js";
import { get_context } from "./init.js";
export const TOUCH_START = 1;
export const TOUCH_MOVE = 2;
export const TOUCH_END = 3;
//TODO : ADD scale & center option ot text object
export const center_text = (text, font, dest) => {
    const ctx = get_context();
    ctx.ctx.font = font;
    const measurements = ctx.ctx.measureText(text);
    const newTextBox = scale_and_center({ x: 0, y: 0, w: measurements.width, h: measurements.actualBoundingBoxAscent + measurements.actualBoundingBoxDescent }, dest, 1);
    return { x: newTextBox.x, y: newTextBox.y + newTextBox.h };
};
export const checkAllFieldsExist = (correct, compare) => {
    const correctKeys = Object.keys(correct).sort();
    const compKeys = Object.keys(compare).sort();
    return correctKeys.every((val, i) => val == compKeys[i]) && correctKeys.length == compKeys.length;
};
export const scale_and_center = (src, dst, scale) => {
    src.w *= scale;
    src.h *= scale;
    src.x = dst.x + (dst.w / 2) - (src.w / 2);
    src.y = dst.y + (dst.h / 2) - (src.h / 2);
    return src;
};
export const handleClick = (x, y) => {
};
// Handle a single touch as it starts
export const handleTouchStart = (id, x, y) => {
    buttons_update({ x: x, y: y }, TOUCH_START);
};
// Handle a single touch that has moved
export const handleTouchMove = (id, x, y) => {
    buttons_update({ x: x, y: y }, TOUCH_MOVE);
};
// Handle a single touch that has ended
export const handleTouchEnd = (id, x, y) => {
    buttons_update({ x: x, y: y }, TOUCH_END);
};
// Handle a single touch that has ended in an unexpected way
//TODO : Find a way to disable right click menu on long presses
export const handleTouchCancel = (id, x, y) => {
    buttons_update({ x: x, y: y }, TOUCH_END);
};

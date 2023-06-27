import { checkAllFieldsExist } from "../utils.js";
const isPoint = (compare) => {
    const correct = { x: 0, y: 0 };
    return checkAllFieldsExist(correct, compare);
};
const isLine = (compare) => {
    const correct = { coordA: { x: 0, y: 0 }, coordB: { x: 0, y: 0 } };
    return checkAllFieldsExist(correct, compare);
};
const isRect = (compare) => {
    const correct = { x: 0, y: 0, w: 0, h: 0 };
    return checkAllFieldsExist(correct, compare);
};
const isCircle = (compare) => {
    const correct = { x: 0, y: 0, radius: 0 };
    return checkAllFieldsExist(correct, compare);
};
const PointInCircle = (point, circle) => {
    return Math.sqrt(//??? IDK if this more comprehensible than a single line ?
    Math.pow(point.x - circle.x, 2)
        +
            Math.pow(point.y - circle.y, 2)) <= circle.radius;
};
const PointInRect = (point, rect) => {
    return point.x >= rect.x &&
        point.y >= rect.y &&
        point.x <= rect.x + rect.w &&
        point.y <= rect.y + rect.h;
};
export { isPoint, isLine, isRect, isCircle, PointInCircle, PointInRect };

const _buttons = [];
// export const DEFAULTT_BUTTON_RECT:Button = new Button(<Rectangle>{x: 0, y:0, w:10, h:10,}, undefined, undefined, undefined)
export const buttons_len = () => _buttons.length;
export const buttons_log = () => console.log('log buttons', _buttons);
export const buttons_set = (state) => {
    for (let item of _buttons) {
        item._active = state;
    }
};
export const buttons_flush = () => {
    _buttons.length = 0;
};
export const buttons_add = (button) => {
    _buttons.push(button);
};
export const buttons_update = (touch, touchType) => {
    for (let item of _buttons) {
        if (item._active) {
            if (item.tryTrigger(touch, touchType)) {
                return;
            }
        }
    }
};

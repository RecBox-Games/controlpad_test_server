import { buttons_add } from "./controller_lib/button.js";
import { drawablesAdd, drawablesRenderAll } from "./controller_lib/draw.js";
import { get_context, init_context } from "./controller_lib/init.js";
import { DEFAULT_DRAWABLE_IMG } from "./controller_lib/types/drawables.js";
import { Button } from "./controller_lib/types/triggerable.js";
import { cp_update } from "./controller_lib/update.js";
const controller = {
    left: { ...DEFAULT_DRAWABLE_IMG },
    right: { ...DEFAULT_DRAWABLE_IMG },
    up: { ...DEFAULT_DRAWABLE_IMG },
    down: { ...DEFAULT_DRAWABLE_IMG },
    exit: { ...DEFAULT_DRAWABLE_IMG },
    enter: { ...DEFAULT_DRAWABLE_IMG },
};
const init_controller = () => {
    const up = new Image();
    const down = new Image();
    const left = new Image();
    const right = new Image();
    const enter = new Image();
    const exit = new Image();
    up.addEventListener('load', () => { console.log('Loaded Arrow'); });
    down.addEventListener('load', () => { console.log('Loaded Arrow'); });
    left.addEventListener('load', () => { console.log('Loaded Arrow'); });
    right.addEventListener('load', () => { console.log('Loaded Arrow'); });
    enter.addEventListener('load', () => { console.log('Loaded enter'); });
    exit.addEventListener('load', () => { console.log('Loaded exit'); });
    up.src = 'resources/up.svg';
    down.src = 'resources/down.svg';
    left.src = 'resources/left.svg';
    right.src = 'resources/right.svg';
    enter.src = 'resources/enter.svg';
    exit.src = 'resources/exit.svg';
    controller.up.image = up;
    controller.down.image = down;
    controller.left.image = left;
    controller.right.image = right;
    controller.enter.image = enter;
    controller.exit.image = exit;
    size_controller();
    buttons_add(new Button(controller.enter.dst, undefined, undefined, () => { console.log("enter"); get_context().ws.send('select'); }));
    buttons_add(new Button(controller.exit.dst, undefined, undefined, () => { console.log("exit"); get_context().ws.send('back'); }));
    buttons_add(new Button(controller.up.dst, undefined, undefined, () => { console.log("up"); get_context().ws.send('up'); }));
    buttons_add(new Button(controller.down.dst, undefined, undefined, () => { console.log("down"); get_context().ws.send('down'); }));
    buttons_add(new Button(controller.left.dst, undefined, undefined, () => { console.log("left"); get_context().ws.send('left'); }));
    buttons_add(new Button(controller.right.dst, undefined, undefined, () => { console.log("right"); get_context().ws.send('right'); }));
};
const size_landscape = () => {
    const dims = get_context().dimensions;
    const pad = 15;
    const enter_origin = { x: dims.x * 0.15, y: dims.y * 0.5 - dims.y * 0.125 };
    const exit_origin = { x: dims.x - dims.x * 0.35, y: dims.y * 0.5 - dims.y * 0.25 };
    controller.enter.dst = { x: enter_origin.x, y: enter_origin.y, h: dims.y * 0.29, w: dims.y * 0.29 };
    controller.exit.dst = { x: exit_origin.x, y: exit_origin.y, h: dims.y * 0.5, w: dims.y * 0.5 };
    controller.left.dst = { ...controller.enter.dst, x: controller.enter.dst.x - controller.enter.dst.w * 0.8 - pad };
    controller.right.dst = { ...controller.enter.dst, x: controller.enter.dst.x + controller.enter.dst.w * 0.8 + pad };
    controller.down.dst = { ...controller.enter.dst, x: controller.enter.dst.x - 5, y: controller.enter.dst.y + controller.enter.dst.h * 0.8 + pad };
    controller.up.dst = { ...controller.enter.dst, x: controller.enter.dst.x + 5, y: controller.enter.dst.y - controller.enter.dst.h * 0.8 - pad };
};
const size_portrait = () => {
    const dims = get_context().dimensions;
    const pad = 25;
    const enter_origin = { y: dims.y * 0.20, x: dims.x * 0.5 - dims.x * 0.125 };
    const exit_origin = { y: dims.y - dims.y * 0.35, x: dims.x * 0.5 - dims.x * 0.25 };
    controller.enter.dst = { y: enter_origin.y, x: enter_origin.x, w: dims.x * 0.29, h: dims.x * 0.29 };
    controller.exit.dst = { y: exit_origin.y, x: exit_origin.x, w: dims.x * 0.5, h: dims.x * 0.5 };
    controller.up.dst = { ...controller.enter.dst, x: controller.enter.dst.x + 6, y: controller.enter.dst.y - controller.enter.dst.h * 0.8 - pad };
    controller.down.dst = { ...controller.enter.dst, x: controller.enter.dst.x - 6, y: controller.enter.dst.y + controller.enter.dst.h * 0.8 + pad };
    controller.right.dst = { ...controller.enter.dst, y: controller.enter.dst.y - 0, x: controller.enter.dst.x + controller.enter.dst.w * 0.8 + pad };
    controller.left.dst = { ...controller.enter.dst, y: controller.enter.dst.y + 0, x: controller.enter.dst.x - controller.enter.dst.w * 0.8 - pad };
};
const size_controller = () => {
    const ctx = get_context();
    if (ctx.dimensions.x > ctx.dimensions.y)
        size_landscape();
    else
        size_portrait();
};
const app = () => {
    const ctx = get_context();
    cp_update();
    // console.log("Hello");
    if (ctx) {
        ctx.ctx.fillStyle = '#3c3c3d';
        ctx.ctx.fillRect(0, 0, ctx.dimensions.x, ctx.dimensions.y);
    }
    drawablesAdd(controller.enter);
    drawablesAdd(controller.left);
    drawablesAdd(controller.right);
    drawablesAdd(controller.up);
    drawablesAdd(controller.down);
    drawablesAdd(controller.exit);
    drawablesRenderAll();
    window.requestAnimationFrame(app);
};
// window.addEventListener("orientationchange", (event) => {
//   console.log(
//     `the orientation of the device is now`, event.target
//   );
// });
window.onload = () => {
    init_context();
    init_controller();
    window.addEventListener('resize', (e) => {
        size_controller();
    });
};
window.requestAnimationFrame(app);
//TODO: add layer to+ drawable & sort it before rendering + render functions

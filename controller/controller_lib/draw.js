import { get_context } from "./init.js";
import { DEFAULT_DRAWABLE_IMG, DEFAULT_DRAWABLE_RECT, DEFAULT_DRAWABLE_TEXT } from "./types/drawables.js";
import { center_text, checkAllFieldsExist } from "./utils.js";
let Idrawables = [];
export const drawablesPrint = () => {
    console.log("Drawables", Idrawables);
    for (let item of Idrawables)
        console.log(item);
};
export const drawablesRenderAll = () => {
    let ctx = get_context();
    // printDrawables();
    // ctx.ctx.fillStyle = "#808080";
    // ctx.ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let item of Idrawables) {
        drawableRenderSingle(ctx, item);
    }
    Idrawables.length = 0;
};
export const drawablesAdd = (item) => {
    Idrawables.push(item);
};
export const drawableRenderSingle = (ctx, drawable) => {
    // console.log('resize fill', ctx);
    if (checkAllFieldsExist(DEFAULT_DRAWABLE_RECT, drawable)) {
        const rect = drawable;
        if (rect.stroke == 0) {
            ctx.ctx.fillStyle = rect.color;
            ctx.ctx.fillRect(rect.boundingBox.x, rect.boundingBox.y, rect.boundingBox.w, rect.boundingBox.h);
        }
        else {
            ctx.ctx.strokeStyle = rect.color;
            ctx.ctx.lineWidth = rect.stroke;
            ctx.ctx.strokeRect(rect.boundingBox.x, rect.boundingBox.y, rect.boundingBox.w, rect.boundingBox.h);
        }
    }
    else if (checkAllFieldsExist(DEFAULT_DRAWABLE_IMG, drawable)) {
        const img = drawable;
        if (img.image && img.image.complete) {
            // ctx.ctx.setTransform(img.scale, 0, 0, img.scale, 0, 0); // sets scale and origin
            if (img.rotation) {
                if (img.dst)
                    ctx.ctx.translate(img.dst.x + img.image.width / 2, img.dst.y + img.image.height / 2);
                ctx.ctx.rotate(Math.PI / 180 * img.rotation);
                if (img.dst)
                    ctx.ctx.translate(-img.dst.x - img.image.width / 2, -img.dst.y - img.image.height / 2);
            }
            if (img.scale)
                ctx.ctx.scale(img.scale, img.scale);
            // !src -> 2 args
            // else 3 args
            // If !dst, fullconst ctx:Context = get_context()
            let dst = { x: 0, y: 0, w: ctx.dimensions.x, h: ctx.dimensions.y };
            ctx.ctx.imageSmoothingEnabled = true;
            if (img.dst)
                dst = img.dst;
            if (img.src) {
                ctx.ctx.drawImage(img.image, img.src.x, img.src.y, img.src.w, img.src.h, dst.x, dst.y, dst.w, dst.h);
            }
            else {
                ctx.ctx.drawImage(img.image, dst.x, dst.y, dst.w, dst.h);
            }
            ctx.ctx.setTransform(1, 0, 0, 1, 0, 0);
            // ctx.ctx.restore();
        }
    }
    else if (checkAllFieldsExist(DEFAULT_DRAWABLE_TEXT, drawable)) {
        const text = drawable;
        // let oldFont = ctx.ctx.font;
        ctx.ctx.fillStyle = text.color;
        ctx.ctx.font = text.font;
        if (text.center)
            text.coords = center_text(text.text, text.font, text.boundingBox);
        ctx.ctx.fillText(text.text, text.coords.x, text.coords.y);
    }
    else
        throw "Drawable types matches none";
};

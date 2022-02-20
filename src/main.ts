import "./style.css";
import spritesheetUrl from "./spritesheet.png";

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (err) => reject(err);

    image.src = src;
  });

const image = await loadImage(spritesheetUrl);

const canvas = document.querySelector<HTMLCanvasElement>("canvas")!;
canvas.width = 256;
canvas.height = 144;

const ctx = canvas.getContext("2d")!;
ctx.imageSmoothingEnabled = false;

function frame(hrt: DOMHighResTimeStamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((hrt / 10) * (Math.PI / 180));

  ctx.drawImage(image, 0, 864, 32, 32, -16, -16, 32, 32);

  ctx.resetTransform();

  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

import { blurCanvasContext } from "./blur";
import { addBottomTextToCanvas } from "./bottom-text";
import { applyEdgeDetection } from "./edge-detection";
import { addTopTextToCanvas } from "./top-text";

export async function createBitmapFromImageUrl(imageUrl: string) {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const bitmap = await createImageBitmap(blob);

  return bitmap;
}

export async function addTopTextToImage(bitmap: ImageBitmap, topText: string) {
  const modifiedImageBitmap = await applyEffectsOnBitmap(bitmap, (ctx) => {
    addTopTextToCanvas(ctx, topText);
  });

  return modifiedImageBitmap;
}

export async function addBottomTextToImage(
  bitmap: ImageBitmap,
  bottomText: string,
) {
  const modifiedImageBitmap = await applyEffectsOnBitmap(bitmap, (ctx) => {
    addBottomTextToCanvas(ctx, bottomText);
  });

  return modifiedImageBitmap;
}

export async function applyBlurToImage(bitmap: ImageBitmap, radius: number) {
  const modifiedImageBitmap = await applyEffectsOnBitmap(bitmap, (ctx) => {
    blurCanvasContext(ctx, radius);
  });

  return modifiedImageBitmap;
}

export async function applyEdgeDetectionToImage(bitmap: ImageBitmap) {
  const modifiedImageBitmap = await applyEffectsOnBitmap(
    bitmap,
    (ctx: OffscreenCanvasRenderingContext2D) => {
      applyEdgeDetection(ctx);
    },
  );

  return modifiedImageBitmap;
}

async function applyEffectsOnBitmap(
  bitmap: ImageBitmap,
  callback: (ctx: OffscreenCanvasRenderingContext2D) => void,
) {
  // Make sure this function is only executed in a web worker to avoid blocking the main thread.
  // You should not remove this check.
  assertRunningInWorker();

  const offscreen = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = offscreen.getContext("2d");

  ctx!.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);
  callback(ctx!);

  const modifiedBitmap = offscreen.transferToImageBitmap();
  return modifiedBitmap;
}

function assertRunningInWorker() {
  if (typeof window !== "undefined") {
    throw new Error(
      `Visual effects should only be applied in a web worker (src/background-process) to not block the main app. Make sure you have not accidentally imported this function in the main thread (src/main).`,
    );
  }
}

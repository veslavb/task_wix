export function drawImageBitmap(
  imageBitmap: ImageBitmap,
  canvas: HTMLCanvasElement,
) {
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  const ctx = canvas.getContext("2d");
  ctx!.drawImage(imageBitmap, 0, 0, imageBitmap.width, imageBitmap.height);
}

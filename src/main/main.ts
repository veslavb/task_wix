import { drawImageBitmap } from "../utils/canvas";
import { createBackgroundProcess } from "./channel";

const { addMessageListener, sendMessage } = createBackgroundProcess();

function uploadImage() {
  const imageUrl = document.getElementById("image-url") as HTMLInputElement;

  if (!imageUrl.validity.valid) {
    alert(`${imageUrl.value} is not a valid url`);
  } else {
    const canvas = document.getElementById(
      "generated-image",
    ) as HTMLCanvasElement;

    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = imageUrl.value;

    image.onload = () => {
      canvas.getContext("2d")?.drawImage(image, 0, 0);
      document.getElementById("image-plceholder")?.classList?.add("d-none");
    };
  }
}

async function applyAction(action: string, value: string | number) {
  const canvas = document.getElementById(
    "generated-image",
  ) as HTMLCanvasElement;

  const str = canvas.toDataURL();

  sendMessage({
    actionType: action,
    value: value,
    img: str,
  });
}

addMessageListener((imageBitmap: ImageBitmap) => {
  const canvas = document.getElementById(
    "generated-image",
  ) as HTMLCanvasElement;

  drawImageBitmap(imageBitmap, canvas);
});

//Upload image
document.getElementById("upload-image")!.addEventListener("click", uploadImage);

//apply top text
document
  .getElementById("apply-top-text")!
  .addEventListener("click", async () => {
    const topTextInput = document.getElementById(
      "top-text",
    ) as HTMLInputElement;

    applyAction("top-text", topTextInput!.value);
  });

//apply blur

document.getElementById("apply-blur")!.addEventListener("click", async () => {
  const topTextInput = document.getElementById(
    "blur-range",
  ) as HTMLInputElement;

  const value = Number(topTextInput.value);
});

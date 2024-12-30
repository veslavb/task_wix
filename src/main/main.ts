import { ActionType } from "../models/action.model";
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

async function applyAction(actionType: ActionType, value?: string | number) {
  const canvas = document.getElementById(
    "generated-image",
  ) as HTMLCanvasElement;

  const img = canvas.toDataURL();

  sendMessage({
    actionType,
    value,
    img,
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
document.getElementById("apply-top-text")!.addEventListener("click", () => {
  const topTextInput = document.getElementById("top-text") as HTMLInputElement;

  applyAction("top-text-filter", topTextInput!.value);
});

//apply blur
document.getElementById("apply-blur")!.addEventListener("click", () => {
  const topTextInput = document.getElementById(
    "blur-range",
  ) as HTMLInputElement;

  const value = Number(topTextInput.value);
  applyAction("blur-filter", value);
});

//apply edges
document.getElementById("apply-edges")!.addEventListener("click", () => {
  applyAction("edges-filter");
});

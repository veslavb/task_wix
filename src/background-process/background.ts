import {
  addTopTextToImage,
  applyBlurToImage,
  applyEdgeDetectionToImage,
  createBitmapFromImageUrl,
} from "../utils/effects";
import { createChannelToMainProcess } from "./channel";

const mainProcess = createChannelToMainProcess();

mainProcess.addMessageListener(async (data) => {
  console.log("Background process received message:", data);
  const img = data?.img;
  const changeValue = data?.value;

  let resultImage = null;

  // The following code is just an example of how to use the effects.
  // You will need to call the appropriate functions to apply the effects when needed.
  const originalImageBitmap = await createBitmapFromImageUrl(img);

  if (data?.actionType === "top-text") {
    resultImage = await addTopTextToImage(originalImageBitmap, changeValue);
  }

  // const imageWithEdgeDetection = await applyEdgeDetectionToImage(img);

  // const imageWithTopText = await addTopTextToImage(
  //   imageWithEdgeDetection,
  //   "TOP TEXT",
  // );

  // const imageWithBlur = await applyBlurToImage(imageWithTopText, 5);

  // The modified image is sent back to the main process.
  mainProcess.sendMessage(resultImage);
});

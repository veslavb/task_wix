import { ActionMessage } from "../models/action.model";
import {
  addTopTextToImage,
  applyBlurToImage,
  applyEdgeDetectionToImage,
  createBitmapFromImageUrl,
} from "../utils/effects";
import { createChannelToMainProcess } from "./channel";

const mainProcess = createChannelToMainProcess();

mainProcess.addMessageListener(async (data: ActionMessage) => {
  console.log("Background process received message:", data);
  const img = data?.img;
  const changeValue = data?.value;

  let resultImage = null;

  const originalImageBitmap = await createBitmapFromImageUrl(img);

  switch (data?.actionType) {
    case "top-text-filter":
      resultImage = await addTopTextToImage(
        originalImageBitmap,
        changeValue as string,
      );
      break;
    case "blur-filter":
      resultImage = await applyBlurToImage(
        originalImageBitmap,
        changeValue as number,
      );
      break;
    case "edges-filter":
      resultImage = await applyEdgeDetectionToImage(originalImageBitmap);
      break;

    default:
      throw new Error("Filter is not recognized");
  }

  mainProcess.sendMessage(resultImage);
});

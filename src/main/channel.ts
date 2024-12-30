export const createBackgroundProcess = () => {
  const worker = new Worker(
    new URL("../background-process/background", import.meta.url),
    { type: "module" },
  );

  const sendMessage = (message: any) => {
    worker.postMessage(message);
  };

  const addMessageListener = (callback: (message: any) => void) => {
    const wrappedCallback = (event: MessageEvent) => {
      callback(event.data);
    };

    worker.addEventListener("message", wrappedCallback);

    return () => {
      worker.removeEventListener("message", wrappedCallback);
    };
  };

  return {
    sendMessage,
    addMessageListener,
  };
};

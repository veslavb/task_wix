export const createChannelToMainProcess = () => {
  const sendMessage = (message: any) => {
    self.postMessage(message);
  };

  const addMessageListener = (callback: (message: any) => void) => {
    const wrappedCallback = (event: MessageEvent) => {
      callback(event.data);
    };

    self.addEventListener("message", wrappedCallback);

    return () => {
      self.removeEventListener("message", wrappedCallback);
    };
  };

  return {
    sendMessage,
    addMessageListener,
  };
};

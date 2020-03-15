export const client = function(socketUrl: string) {
  const socket = new WebSocket(socketUrl);
  return socket;
};

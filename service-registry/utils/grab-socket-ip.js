const grabSocketIp = (socket) => {
  // grab either v6 or v4 ip address
  return socket.remoteAddress.includes('::') ? `[${socket.remoteAddress}]` : socket.remoteAddress;
};

export default grabSocketIp;
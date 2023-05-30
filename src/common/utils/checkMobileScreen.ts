export const checkMobileScreen = () => {
  const isMobileAgentDevice =
    /\b(Android|Windows Phone|webOS|BlackBerry|iPhone|iPad|iPod|IEMobile|Opera Mini)\b/i.test(
      navigator.userAgent
    );

  return isMobileAgentDevice;
};

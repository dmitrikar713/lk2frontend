import { blitzPlugin } from 'src/plugins/blitz';

export const getCerts = async () => {
  await blitzPlugin.init();
  return blitzPlugin.getCerts();
};

export const getSigner = async (cert: any) => {
  return blitzPlugin.getSigner(cert);
};

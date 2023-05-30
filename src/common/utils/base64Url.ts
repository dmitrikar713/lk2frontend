import axios from 'axios';
import { Buffer } from 'buffer';

export const getBase64Url = async (url: string): Promise<string> => {
  const result = await axios.get(url, {
    responseType: 'arraybuffer',
  });
  return Buffer.from(result.data, 'binary').toString('base64');
};

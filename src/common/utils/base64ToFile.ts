export const base64ToFile = (base64: string, filename: string) => {
  const mimeType = base64.split(';')[0].split('data:')[1];

  return fetch(base64)
    .then((resolve) => resolve.arrayBuffer())
    .then((buffer) => new File([buffer], filename, { type: mimeType }));
};

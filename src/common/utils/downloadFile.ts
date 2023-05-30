export const downloadFile = (nameFile: string, file?: Blob, url?: string) => {
  let downloadUrl = '';
  if (file) {
    const blob = new Blob([file], {
      type: 'application/pdf',
    });
    downloadUrl = window.URL.createObjectURL(blob);
  } else {
    downloadUrl = url ? url : '';
  }
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = nameFile;
  document.body.appendChild(link);
  link.click();
  link.remove();
};

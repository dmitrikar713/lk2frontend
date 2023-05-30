import printJS from 'print-js';

export const printFile = (file?: Blob, url?: string) => {
  let downloadUrl = '';
  if (file) {
    const blob = new Blob([file], {
      type: 'application/pdf',
    });
    downloadUrl = window.URL.createObjectURL(blob);
  } else {
    downloadUrl = url ? url : '';
  }
  printJS(downloadUrl);
};

let plugin: any;
let uploadedCerts: Array<any> = [];
const uploadedSigners: Array<any> = [];

const factory = (global as any).Blitzsc.createFactory(
  'Blitz Smart Card Plugin',
  'application/x-blitz-sc-plugin',
  'ru.reaxoft.firewyrmhost',
  '1.16.0.0'
);

export const blitzPlugin = {
  init() {
    if (plugin) {
      return Promise.resolve(plugin);
    }

    return new Promise((resolve, reject) => {
      factory(
        (pl: any) => {
          return pl.initPKCS11([]).then(
            (p11: any) => {
              p11.retain();
              plugin = p11;
              resolve(plugin);
            },
            (err: any) => {
              reject(err);
            }
          );
        },
        (err: any) => {
          reject(err);
        }
      );
    });
  },
  getCerts: () => {
    if (uploadedCerts.length > 0) {
      return Promise.resolve(uploadedCerts);
    }

    return new Promise((resolve, reject) => {
      try {
        return plugin.getCertsForSign(true).then((certs: any) => {
          const promises = certs.map((cert: any) => {
            cert.retain();
            return cert.full_info;
          });
          Promise.all(promises).then((certsList) => {
            const hydratedCerts = certsList.reduce(
              (acc, next, index) =>
                next.token_info.label != 'My'
                  ? [...acc, { cert: certs[index], info: next }]
                  : acc,
              []
            );
            uploadedCerts = hydratedCerts;
            resolve(hydratedCerts);
          });
        });
      } catch (err) {
        reject(err);
      }
    });
  },
  getSigner: (cert: any) => {
    if (uploadedSigners[cert.info.sn]) {
      const signer = uploadedSigners[cert.info.sn];
      signer.retain();
      return Promise.resolve(signer);
    }

    return new Promise(async (resolve, reject) => {
      try {
        cert.cert.retain();
        const signer = await cert.cert.start_signing(false, 3);
        uploadedSigners[cert.info.sn] = signer;
        signer.retain();
        resolve(signer);
      } catch (err) {
        reject(err);
      }
    });
  },
};

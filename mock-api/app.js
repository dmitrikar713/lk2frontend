const http = require('http');
const fs = require('fs').promises;
const argon2 = require('argon2');
const qs = require('querystring');
const jwt = require('jsonwebtoken');

const {
  host,
  port,
  apiUrl,
  headers,
  jwtSecretKey,
  jwtLifetime,
} = require('./constants');
const { login, password } = require('./loginData');
const { authURL } = require('./urls');

const createJWT = (login) =>
  jwt.sign(
    {
      login,
    },
    jwtSecretKey,
    { expiresIn: jwtLifetime }
  );

const requestListener = async (req, res) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    try {
      jwt.verify(token, jwtSecretKey);
    } catch (err) {
      res.writeHead(401, headers);
      res.end();
      return;
    }
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end();
  }

  if (req.url === authURL && req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html');
    try {
      const contents = await fs.readFile(`${__dirname}/login/index.html`);
      res.writeHead(200, headers);
      res.end(contents);
      return;
    } catch (e) {
      res.writeHead(404);
      res.end('<h1>Page does not exist :(</h1>');
      return;
    }
  }

  if (req.url === authURL && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const { login: inputLogin, password: inputPassword } = qs.parse(body);
      if (inputLogin === login) {
        const correctPassword = await argon2.verify(password, inputPassword);
        if (correctPassword) {
          const reqParams = new URLSearchParams(req.url.split('?')[1]);
          res.writeHead(302, {
            Location: `${reqParams.get('redirect')}#access_token=${createJWT(
              login
            )}`,
          });
          res.end();
          return;
        }
        res.writeHead(401, { Location: req.url });
        res.end('password is incorrect');
        return;
      } else {
        res.writeHead(401, { Location: req.url });
        res.end('login not found');
        return;
      }
    });
  }

  if (req.url.split('/')[2] === 'profile') {
    if (req.method === 'POST') {
      let newProfileData = '';

      req.on('data', function (data) {
        newProfileData += data;
      });

      req.on('end', async () => {
        try {
          await fs.writeFile(`${__dirname}/profile/GET.json`, newProfileData);
          res.setHeader('Content-Type', 'application/json');
          res.writeHead(200, headers);
          res.end(newProfileData);
          return;
        } catch (err) {
          res.setHeader('Content-Type', 'application/json');
          res.writeHead(500);
          res.end(err);
          return;
        }
      });
    }
  }

  if (req.url.split('/')[2] === 'requests') {
    if (req.method === 'GET') {
      const requestId = req.url.split('/')[3];

      if (!requestId) {
        try {
          const requestsList = await fs.readFile(
            `${__dirname}/requests/GET.json`,
            'utf-8'
          );
          res.setHeader('Content-Type', 'application/json');
          res.writeHead(200, headers);
          res.end(requestsList);
          return;
        } catch (err) {
          res.setHeader('Content-Type', 'application/json');
          res.writeHead(404);
          res.end(JSON.stringify({ error: 'Resource not found' }));
          return;
        }
      }

      try {
        const requestsList = await fs.readFile(
          `${__dirname}/requests/GET.json`,
          'utf-8'
        );
        const request = JSON.parse(requestsList).find(
          (reqItem) => reqItem.id.toString() === requestId
        );

        if (!request) {
          throw new Error('Request not found');
        }

        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200, headers);
        res.end(JSON.stringify(request));
        return;
      } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Resource not found' }));
        return;
      }
    }
    if (req.method === 'POST') {
      let body = '';

      req.on('data', function (data) {
        body += data;
      });

      req.on('end', async () => {
        try {
          const sentRequest = JSON.parse(body);

          const date = new Date();
          const time = date.getTime();
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const dateString = `${day <= 9 ? '0' + day : day}.${
            month <= 9 ? '0' + month : month
          }.${year}`;

          const newRequest = {
            ...sentRequest,
            id: time,
            name: sentRequest.serviceName,
            number: time,
            date: dateString,
            status: 'Processing',
            statusId: 1,
            smileIcon: '✋',
            notification: '',
          };

          const requestsJSON = await fs.readFile(
            `${__dirname}/requests/GET.json`,
            'utf8'
          );
          const requestsList = JSON.parse(requestsJSON);
          const newRequestsList = [...requestsList, newRequest];
          await fs.writeFile(
            `${__dirname}/requests/GET.json`,
            JSON.stringify(newRequestsList)
          );
          res.setHeader('Content-Type', 'application/json');
          res.writeHead(200, headers);
          res.end(JSON.stringify(newRequestsList));
          return;
        } catch (err) {
          res.setHeader('Content-Type', 'application/json');
          res.writeHead(500);
          res.end(err);
          return;
        }
      });
    }
  }

  if (req.url.split('/')[2] === 'notifications') {
    if (req.url.split('/')[3] === 'read' && req.method === 'GET') {
      await fs.writeFile(
        `${__dirname}/notifications/GET.json`,
        JSON.stringify([])
      );
      const requestsJSON = await fs.readFile(
        `${__dirname}/requests/GET.json`,
        'utf-8'
      );
      const requests = JSON.parse(requestsJSON);
      await fs.writeFile(
        `${__dirname}/requests/GET.json`,
        JSON.stringify(requests.map((el) => ({ ...el, notification: '' })))
      );
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(200, headers);
      res.end(JSON.stringify([]));
      return;
    }
  }

  if (req.method === 'GET') {
    try {
      const contents = await fs.readFile(
        `${__dirname}/${req.url?.split(apiUrl)[1]}/GET.json`
      );
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(200, headers);
      res.end(contents);
      return;
    } catch (e) {
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Resource not found' }));
      return;
    }
  }
};

const server = http.createServer(requestListener);

server.listen(port, host);

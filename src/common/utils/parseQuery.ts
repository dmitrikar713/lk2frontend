import { StringObject } from 'src/entities/BaseTypes';

export const parseQuery = (variable: string): StringObject => {
  const query = variable.substring(1);
  const vars = query.split('&');
  let obj = {};
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    obj = { ...obj, [pair[0]]: pair[1] };
  }

  return obj;
};

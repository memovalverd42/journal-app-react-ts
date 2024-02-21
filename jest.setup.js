/* eslint-disable no-undef */
import 'whatwg-fetch';

require('dotenv').config({ path: '.env.test' });

jest.mock('./src/helper/getEnvironments', () => ({
  getEvironments: () => ({...process.env})
}));
import axios, { AxiosResponse } from 'axios';
import OAuth from 'oauth-1.0a';
import hmacSHA1 from 'crypto-js/hmac-sha1';
import Base64 from 'crypto-js/enc-base64';

export const config = {
  WC_BASE_URL: 'https://wpdevu5.onlinetestingserver.com/apptestwoo/index.php',
  WC_API_URL: '/wp-json/wc/v3',
  WC_CONSUMER_KEY: 'ck_e715558bf318d24516cc04ad349bac08886fa825',
  WC_CONSUMER_SECRET: 'cs_b9ac8c873791644306908487935d5f088c6adc1d'
};

const _getOAuth = () =>
  new OAuth({
    consumer: {
      key: config.WC_CONSUMER_KEY,
      secret: config.WC_CONSUMER_SECRET
    },
    signature_method: 'HMAC-SHA1',
    hash_function: (baseString, key) =>
      Base64.stringify(hmacSHA1(baseString, key))
  });

const get = async (path) => {
  const request = {
    url: `${config.WC_BASE_URL}${config.WC_API_URL}${path}`,
    method: 'GET'
  };
  const oauth = _getOAuth().authorize(request);


  return axios.get(request.url, { params: oauth });
};

const post = async (path, body) => {
  const request = {
    url: `${config.WC_BASE_URL}${config.WC_API_URL}${path}`,
    method: 'POST'
  };
  const oauth = _getOAuth().authorize(request);

  return axios.post(request.url, body, { params: oauth });
};

export default {
  get,
  post
};

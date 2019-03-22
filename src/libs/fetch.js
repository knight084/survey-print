import axios from 'axios';
import apiConfig from '../configs/api';
import httpConfig from '../configs/http';
import utils from "../utils";
import {LoadingBar, Notice} from 'iview';

LoadingBar.config({
  height: 3
});

const baseURL = `${apiConfig.protocol}//${apiConfig.host}:${apiConfig.port}${apiConfig.prefix}${apiConfig.version}`;
const baseTimeout = httpConfig.baseTimeout;
const maxContentLength = httpConfig.maxContentLength;

export default async params => {
  let {url, method, data, headers, timeout, silence} = params;
  method = method ? method.toLowerCase() : 'get';
  headers = headers || null;

  // common config of request
  const commonConfig = {url, method, baseURL, headers, timeout: timeout || baseTimeout, maxContentLength};

  // create an instance of axios with common config
  const instance = axios.create(commonConfig);

  // request interceptor of created instance
  instance.interceptors.request.use(
    // do something before request is sent
    function (config) {
      const {url, headers} = config;

      // not login endpoint
      if (!url.match(/^\/login/i)) {
        headers['Authorization'] = utils.sessionStorage.get('token') || '';
      }

      return config;
    },
    // do something with request error
    function (e) {
      /* ------- http error -------- */
      console.error('http config error: ', e);
      return Promise.reject(e);
    }
  );

  // response interceptor of created instance
  instance.interceptors.response.use(
    // do something with response data
    function (response) {
      /* ------- business error -------- */
      const {data} = response;

      // server error
      if (!data) {
        return Promise.reject(new Error('服务异常'));
      }

      const {code} = data;

      // server error
      if (+code >= 500) {
        return Promise.reject(new Error('服务异常'));
      }

      // params error
      if (+code >= 400 && +code < 500) {
        return Promise.reject(new Error('参数有误'));
      }

      return Promise.resolve(data);

    },
    // do something with response error
    function (e) {
      /* ------- http error -------- */
      console.error('http response error: ', e);

      !silence && Notice.error({
        title: '服务超时',
        desc: '服务超时，请重试'
      });

      return Promise.reject(e);
    }
  );

  // special config of request
  const specialConfig = method === 'post' || method === 'put' || method === 'patch'
    // post, put or patch method
    ? (
      headers && headers['Content-Type'] && headers['Content-Type'].includes('application/x-www-form-urlencoded')
        // Content-Type: 'application/x-www-form-urlencoded;charset=UTF-8'
        ? {
          data,
          // transform request data to query-string if Content-Type is 'application/x-www-form-urlencoded'
          transformRequest: [function (data, headers) {
            const contentType = headers['Content-Type'] || headers['content-type'];

            return contentType && contentType.includes('application/x-www-form-urlencoded')
              ? utils.query.serialize(data) : data;
          }]
        }
        // Content-Type: 'application/json;charset=UTF-8'
        : {data}
    )
    // get, delete or head method
    : {params: data};

  // send request
  try {
    !silence && LoadingBar.start();

    const res = await instance.request(specialConfig);

    !silence && LoadingBar.finish();

    return res;
  }
  catch (e) {
    // TODO: handle the errors both http-error and business-error here, not in the response interceptor

    !silence && LoadingBar.error();

    return null;
  }

};

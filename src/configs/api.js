const env = process.env.VUE_APP_ENV || 'development';

let protocol = window.location.protocol
  , host
  , port
  , version
  , prefix;

switch (env) {
  case 'test':
    host = 'sop.supplus.cn';
    port = '';
    prefix = '/api';
    break;

  case 'production':
    host = 'sop-fec.ministudy.com';
    port = '';
    prefix = '/api_1120';
    break;

  default :
    host = '10.247.67.206';
    port = 8001;
    prefix = '/api';
}

export default {protocol, host, port, version, prefix};

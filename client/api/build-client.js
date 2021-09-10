import axios from 'axios';

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on the server

    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      },
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseUrl: '/',
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      },
    });
  }
};
export default buildClient;

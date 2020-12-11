/* Config */
const url = '/wp-json/soundit/';
const api = {
  forms: {
    contact: `${url}v1/contact-form`,
    newsletter: `${url}v1/newsletter`,
  },
};

export default api;

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function parseJSON(response) {
  return response.json();
}

export function errorResponse(response) {
  throw Error(response);
}

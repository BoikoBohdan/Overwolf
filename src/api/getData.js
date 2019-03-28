import axios from 'axios'
export const getData = url => {
  console.log('123')
  return axios
    .get(url, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        'access-control-allow-origin': '*'
      },
      method: 'GET'
    })
    .then(res => res.data)
}

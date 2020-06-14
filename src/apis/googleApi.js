import axios from 'axios';

const url =
  'https://maps.googleapis.com/maps/api/directions/json?origin=' +
  origin.lat +
  ',' +
  origin.lng +
  '&destination=' +
  origin.lat +
  ',' +
  origin.lng +
  '&key=AIzaSyCItPS2kge78bOlNHklYqU4Fp_z5fEJNPI';
export default axios.create({
  baseURL: url,
});

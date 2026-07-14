import axios from 'axios';

const api = axios.create({
  //서버 주소
  baseURL: 'https://mutsa-food.shop',
  headers: {
    'Content-Type': 'application/json',
  },
});

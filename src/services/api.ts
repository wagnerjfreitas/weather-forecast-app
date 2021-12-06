import axios from 'axios';

const apiAxios = axios.create({
  baseURL: 'http://localhost:3333/api/weather-forecast'
});

export const api = {
  get5Days: async (city: string) => {
    await apiAxios.get(`/5-days/${city}`).then(response => {
      return response.data
    }).catch(err => {
      console.log('Error:get5Days:', err)
      return false
    })
  },

  getHistory: async () => {
    await apiAxios.get('/5-days/history').then(response => {
      return response.data
    }).catch(err => {
      console.log('Error:getHistory:', err)
      return false
    })
  },

}

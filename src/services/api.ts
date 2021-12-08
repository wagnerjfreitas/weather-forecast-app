import axios from 'axios';

const apiAxios = axios.create({
  baseURL: 'http://192.168.0.108:3333/api/weather-forecast'
});

export const api = {

  get5Days: async (city: string) => {
    try {
      const {data} = await apiAxios.get(`/5-days/${city}`)
      return data;
    } catch (error){
      console.log('Error:get5Days:', JSON.stringify(error))
      return false
    }
  },

  getHistory: async () => {
    try {
      const {data} = await apiAxios.get('/5-days/history')
      return data;
    } catch (error){
      console.log('Error:getHistory:', JSON.stringify(error))
      return false
    }
  }
}

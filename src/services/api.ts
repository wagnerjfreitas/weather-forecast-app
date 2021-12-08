import axios from 'axios';
import { params } from '../../config/params';

const apiAxios = axios.create({
  baseURL: params.url_api
});

export const api = {

  get5Days: async (city: string) => {
    try {
      const {data} = await apiAxios.get(`/weather-forecast/5-days/${city}`)
      return data;
    } catch (error){
      console.log('Error:get5Days:', JSON.stringify(error))
      return false
    }
  },

  getHistory: async () => {
    try {
      const {data} = await apiAxios.get('/weather-forecast/5-days/history')
      return data;
    } catch (error){
      console.log('Error:getHistory:', JSON.stringify(error))
      return false
    }
  }
}

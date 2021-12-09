import axios from 'axios';
import { params } from '../../config/params';
import { Forecast } from '../types/WeatherForecast';

const apiAxios = axios.create({
  baseURL: params.url_api,
  timeout: 5000
});

export const api = {

  get5Days: async (city: string) => {
    try {
      const {data} = await apiAxios.get(`/weather-forecast/5-days/${city}`)
      return data;
    } catch (error: any){
      console.log('Error:get5Days:', JSON.stringify(error.message))
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

import db from '../../db'
import { WeatherForecast } from '../../../models';
import CrudDAO from '../CrudDAO'
import { ResultSet, ResultSetError } from 'expo-sqlite';

/*
  As alterações neste arquivo não são recarregadas imediatamente no Expo.
  Para ver as alterações realizadas execute o aplicativo novamente.
*/

class WeatherForecastDAO extends CrudDAO<WeatherForecast> {
  
  constructor() {
    super('weather_forecast', 'id');
  }

  findByCityId = async (cityId :number) => {
    try {
      const result: any = await db.execute(`SELECT * FROM ${this.tableName} where city_id=? order by dt desc;`, [
        String(cityId),
      ])
      return result.rows.length > 0 ? result.rows : []
    } catch (error) {
      console.log('error:', error)
      return false
    }
  }

  findByCityName = async (cityName :string) => {
    try {
      const result: any = await db.execute(`SELECT * FROM ${this.tableName} where city_name=? order by dt;`, [
        cityName,
      ])
      return result.rows.length > 0 ? result.rows : []
    } catch (error) {
      console.log('error:', error)
      return false
    }
  }

  findAll = async () => {
    try {
      const result: any = await db.execute(`SELECT * FROM ${this.tableName} order by city_name, dt;`)
      return result.rows.length > 0 ? result.rows : []
    } catch (error) {
      console.log('error:', error)
      return false
    }
  }

  
  removeHistoryByCityId = async (id: number) => {
    this.validate()
    try {
      const result = await db.execute(`DELETE FROM ${this.tableName} WHERE city_id=?;`, [
        String(id),
      ])
      if ((result as ResultSet)) {
        return (result as ResultSet).rowsAffected > 0 ? true : false
      } 
      else {
        throw (result as ResultSetError).error
      }
    } catch (error) {
      console.log('crudDAO:removeHistoryCity:error:', error)
      return false
    }
  }
}

export default new WeatherForecastDAO()

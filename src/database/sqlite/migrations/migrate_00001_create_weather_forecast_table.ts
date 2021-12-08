import { Connection } from "../database"

export default async function (connection: Connection) {
    await connection.execute(
      `CREATE TABLE IF NOT EXISTS 
        weather_forecast (
          id TEXT NOT NULL PRIMARY KEY,
          city_id integer NOT NULL,
          city_name TEXT DEFAULT NULL,
          dt integer DEFAULT NULL,
          dt_txt TEXT DEFAULT NULL, 
          temp intger DEFAULT NULL,
          temp_min TEXT DEFAULT NULL,
          temp_max TEXT DEFAULT NULL,
          humidity TEXT DEFAULT NULL,
          description TEXT DEFAULT NULL,
          icon TEXT DEFAULT NULL
      ) WITHOUT ROWID;`,
    )
    await connection.execute(
      `CREATE UNIQUE index uk_weather_forecast_id on weather_forecast(id)`,
    )
  }
  
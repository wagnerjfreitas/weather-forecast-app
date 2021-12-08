/**
 * https://gist.github.com/GendelfLugansk/db31d7742c4dbc3d6d768fa525474aff
 */
 import Constants from 'expo-constants'
import { Connection, Database } from '../database'

import migrate_00001_create_weather_forecast_table from '../migrations/migrate_00001_create_weather_forecast_table';

import migrate_drop_tables from '../migrations/migrate_drop_tables';

const migrations: Function[] = [
  () => {},
  migrate_00001_create_weather_forecast_table,
]

const migrationsTable = '_migrations'


const db = new Database(Constants.manifest?.scheme, {
  prepareConnFn: async (connection: Connection) => {
    try {
      await connection.execute(
        'PRAGMA foreign_keys = ON; Default Timeout=20; PRAGMA busy_timeout = 600; PRAGMA synchronous=Off',
      )
    } catch (e) {
      console.log("db.prepareConnFn:error", e)
    }
  },
  dropTablesFn: async (connection: Connection) => {
    await connection.beginTransaction()
    try {
      await migrate_drop_tables(connection)

      await connection.commitTransaction()
    } catch (e) {
      await connection.rollbackTransaction()
      console.log("db.dropTablesFn:error", e)
    }
  },
  migrateFn: async (connection: Connection) => {
    await connection.beginTransaction()
    try {
      await connection.execute(
        `create table if not exists ${migrationsTable} (version integer primary key, updatedAt text not null)`,
      )
      const result = await connection.execute(`select * from ${migrationsTable}`) as any;
      const versions = result.rows.map(({ version }: any)  => version)
        
      const currentVersion = Math.max(0, ...versions)
      for (let i = currentVersion + 1; i < migrations.length; i++) {
        await migrations[i](connection);
        await connection.execute(
          `insert into ${migrationsTable} values (?, ?)`,
          [i.toString() , new Date().toISOString()],
        )
        console.log(`Applied migration ${i}`)
      }
      await connection.commitTransaction()
    } catch (e) {
      await connection.rollbackTransaction()
      console.log('db:migrateFn:error:', e)
    }
  },
})

export default db

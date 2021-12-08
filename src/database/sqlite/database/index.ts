import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system'
import { ResultSet, ResultSetError, WebSQLDatabase } from 'expo-sqlite';

export const deleteBD = async (databaseName: string) => {
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  }

  if ((await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite/' + databaseName)).exists) {
    await FileSystem.deleteAsync(FileSystem.documentDirectory + 'SQLite/' + databaseName);
    console.log("banco excluido");
  }

}

export class Connection {
  _db: WebSQLDatabase;
  transacting: boolean;
  
  constructor(databaseName: string) {
    this._db = SQLite.openDatabase(databaseName)
    this.transacting = false
  }

  execute(sqlStatement: string, args: string[] = [])  {
    return new Promise<ResultSet| ResultSetError>((resolve, reject) => {
      this._db.exec([{ sql: sqlStatement, args }], false, (err, res) => {
        if (!!err) {
          console.log('database error', err)
          return reject(err)
        }

        if (res) {
          // console.log('database', res[0])
          resolve((res[0] as ResultSet))
        }
      })
    })
  }

  async beginTransaction() {
    await this.execute('begin transaction')
    this.transacting = true
  }

  async commitTransaction() {
    await this.execute('commit')
    this.transacting = false
  }

  async rollbackTransaction() {
    await this.execute('rollback')
    this.transacting = false
  }

}

type ParamsDatabase = {
  prepareConnFn: Function | Promise<any>;
  migrateFn: Function | Promise<any>;
  dropTablesFn: Function | Promise<any>;
}

export class Database {

  _dbName: string;
  _connection: Connection;
  _params: ParamsDatabase;
  _prepareConnectionPromise: Function | Promise<any>;
  _migrationPromise: Function | Promise<any>;

  constructor(name: string = 'database_name', paramsDatabase: ParamsDatabase) {
    this._dbName = name
    this._connection = new Connection(this._dbName)
    this._params = paramsDatabase 

    this._prepareConnectionPromise =
      typeof this._params.prepareConnFn === 'function'
        ? this._params.prepareConnFn(this._connection)
        : Promise.resolve()

    const performMigration = async () => {
      const connection = new Connection(this._dbName)
      if(typeof this._params.migrateFn === 'function') await this._params.migrateFn(connection)
    }

    this._migrationPromise =
      typeof this._params.migrateFn === 'function'
        ? performMigration()
        : Promise.resolve()

  }

  async dropTables(){
    const connection = new Connection(this._dbName);
    if(typeof this._params.dropTablesFn === 'function') await this._params.dropTablesFn(connection);
    if(typeof this._params.prepareConnFn === 'function') await this._params.prepareConnFn(connection)
    if(typeof this._params.migrateFn === 'function') await this._params.migrateFn(connection)
  }

  async execute(sqlQuery: string, args: string[] = []) {
    await this._prepareConnectionPromise
    await this._migrationPromise

    return await this._connection.execute(sqlQuery, args)
  }

  async transaction(cb: Function) {
    await this._prepareConnectionPromise
    await this._migrationPromise
    if (typeof this._params.prepareConnFn === 'function') {
      await this._params.prepareConnFn(this._connection)
    }
    try {
      await this._connection.beginTransaction()
      try {
        await cb(this._connection)
        await this._connection.commitTransaction()
      } catch (e) {
        await this._connection.rollbackTransaction()
        throw e
      }
    } catch (e) {
      throw e
    }
  }

}

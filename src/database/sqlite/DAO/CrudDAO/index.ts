import { ResultSet, ResultSetError } from 'expo-sqlite';
import db from '../../db'
import insertSQL from '../insertSQL'
import updateSQL from '../updateSQL'

/*
  As alterações neste arquivo não são recarregadas imediatamente no Expo.
  Para ver as alterações realizadas execute o aplicativo novamente.
*/

export class CrudDAO<T> {

  public tableName: string;
  public primaryKey: string;

  constructor(tableName: string, primaryKey: string) {
    this.tableName = tableName;
    this.primaryKey = primaryKey;
  }
  
  validate = () => {
    if (this.tableName == undefined) throw 'Ops! Faltou atribuir o nome da tabela para a propriedade tableName na classe filha >>> constructor(tableName, primaryKey) <<<.'
    if (this.primaryKey == undefined) throw 'Ops! Faltou atribuir o nome da chave primária para a propriedade primaryKey na classe filha >>> constructor(tableName, primaryKey) <<<.'
  }

  create = async (obj:T) => {
    this.validate()
    try { 
        const result = await db.execute(
          insertSQL.getString(this.tableName, obj)
        )
        if ((result as ResultSet).rowsAffected) {
          return (result as ResultSet).rowsAffected > 0 ? true : false
        } else {
          throw (result as ResultSetError).error
        }
        
    } catch (error) {
      console.log('crudDAO:create:error:', error)
      return false
    }
  }

  update = async (obj: T) => {
    this.validate()
    try {
        const result = await db.execute(
          updateSQL.getString(this.tableName, this.primaryKey, obj)
        )
        if ((result as ResultSet).rowsAffected) {
          return (result as ResultSet).rowsAffected > 0 ? true : false
        } 
        else {
          throw (result as ResultSetError).error
        }
    } catch (error) {
      console.log('crudDAO:update:error: ', error)
      return false
    }
  }

  find = async (id: string) => {
    this.validate()
    try {
      const result = await db.execute(`SELECT * FROM ${this.tableName} WHERE ${this.primaryKey}=?;`, [
        id,
      ])
      if ((result as ResultSet).rows !== undefined) {
        return (result as ResultSet).rows.length > 0 
          ? ((result as ResultSet).rows[0] as T) 
          : false
      } 
      else {
        throw (result as ResultSetError).error
      }
      
    } catch (error) {
      console.log('crudDAO:find:error: ', error)
      return false
    }
  }

  findLastId = async () => {
    this.validate()
    try {
      const result = await db.execute(`SELECT Max(id) as id FROM ${this.tableName};`
      )
      // console.log('crudDAO:findNextId:ResultSet: ', (result as ResultSet))

      if ((result as ResultSet).rows !== undefined) {
        return (result as ResultSet).rows.length > 0 
          ? ((result as ResultSet).rows[0].id as number)
          : false
      } 
      else {
        console.log('crudDAO:findNextId:error: ', (result as ResultSetError).error)
        throw (result as ResultSetError).error
      }
      
    } catch (error) {
      console.log('crudDAO:findNextId:error: ', error)
      return false
    }
  }

  remove = async (id: number) => {
    this.validate()
    try {
      const result = await db.execute(`DELETE FROM ${this.tableName} WHERE ${this.primaryKey}=?;`, [
        String(id),
      ])
      if ((result as ResultSet).rowsAffected) {
        return (result as ResultSet).rowsAffected > 0 ? true : false
      } 
      else {
        throw (result as ResultSetError).error
      }
    } catch (error) {
      console.log('crudDAO:remove:error:', error)
      return false
    }
  }

  removeAll = async () => {
    this.validate()
    try {
      const result = await db.execute(`DELETE FROM ${this.tableName};`)
      if ((result as ResultSet).rowsAffected) {
        return (result as ResultSet).rowsAffected > 0 ? true : false
      } 
      else {
        throw (result as ResultSetError).error
      }
    } catch (error) {
      console.log('crudDAO:removeAll:error:', error)
      return false
    }
  }

  all = async () => {
    try {
      let result = await db.execute(`SELECT * FROM ${this.tableName} order by ${this.primaryKey} desc;`)          

      if ((result as ResultSet).rows !== undefined) {
        return (result as ResultSet).rows.length > 0 
          ? ((result as ResultSet).rows.map(item => item as T)) 
          : false
      }
      else {
        throw (result as ResultSetError).error
      }    
    } catch (error) {
      console.log('crudDAO:all:error: ', error)
      return false
    }
  }
} 


export default CrudDAO

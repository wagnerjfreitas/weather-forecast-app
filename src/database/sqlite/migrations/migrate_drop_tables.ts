import { ResultSet } from "expo-sqlite"
import { Connection } from "../database"

export default async function (connection: Connection) {
  const tabelas = await connection.execute(
    `select name from sqlite_master where type is 'table';`,
  )
  for (let i = 0; i < (tabelas as ResultSet).rows.length; i++) {
    await connection.execute(

      `DROP table ${(tabelas as ResultSet).rows[i].name};`,
      
    )
    console.log('Tabela', (tabelas as ResultSet).rows[i].name, 'excluida')
  }
}

import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import UserProjects from 'Database/migrations/1657039928884_user_projects'

export default class Planning extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  // a vérifier
  @hasMany(() => UserProjects)
  public posts: HasMany<typeof UserProjects>

  @column()
  public day_date: DateTime 

  @column()
  public day_quantity: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}



// table.dateTime('day_date')
// table.float('day_quantity').nullable
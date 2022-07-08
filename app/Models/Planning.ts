import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import UserProjects from 'Database/migrations/1657039928884_user_projects'

export default class Planning extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public dayDate: DateTime 
  @column()
  public day_quantity: number
  @column()
  public isDeleted?: boolean
   @column.dateTime({ columnName: 'deletedAt' })
   public deletedAt?: DateTime | null
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // a vérifier
  @manyToMany(() => UserProjects)
  public user_projects: manyToMany<typeof UserProjects>
}



import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Planning from './Planning'
import User from './User'

export default class UserProject extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId : number
  
  @column()
  public projectId : number

  @column()
  public isDeleted? : boolean

  @column.dateTime({ columnName: 'deletedAt' })
  public deletedAt?: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

   // a vérifier
   @manyToMany(() => Planning)
   public plannings: manyToMany<typeof Planning>

    // a vérifier
    @manyToMany(() => User)
    public users: manyToMany<typeof User>
}

import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Token extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  //relation ship,
  @hasOne(() => User)
  public profile: HasOne<typeof User>

  @column()
  public token: string
  @column()
  public expires_at: DateTime
  @column()
  public count_token: number
  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}



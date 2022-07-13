import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Token extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public type: string
  @column()
  public name?: string
  @column()
  public token: string
  @column()
  public expiresAt: DateTime
  @column()
  public counToken: number
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  
  //relation ship,
  @hasOne(() => User)
  public profile: HasOne<typeof User>

}



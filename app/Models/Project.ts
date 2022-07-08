import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public projectName: string  
  @column()
  public projectKey: string  
  @column()
  public clientName: string  
  @column()
  public projectDetails?: string  
  @column()
  public restaurantTicket: boolean 
  @column()
  public isDeleted?: boolean   
  @column.dateTime({ columnName: 'deletedAt' })
  public deletedAt?: DateTime | null
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // à vérifier
  @manyToMany(() => User)
  public users: manyToMany<typeof User>;
}

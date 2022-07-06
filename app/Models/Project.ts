import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public project_name: string  
  @column()
  public project_key: string  
  @column()
  public client_name: string  
  @column()
  public project_details: string  
  @column()
  public restaurant_ticket: boolean  
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

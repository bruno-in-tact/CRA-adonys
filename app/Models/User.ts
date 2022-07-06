import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave, hasMany} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Logger from '@ioc:Adonis/Core/Logger'
import Project from './Project'


export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public first_name: string
  @column()
  public last_name: string
  @column()
  public password: string
  @column()
  public email: string;
  @column()
  public rememberMeToken?: string;
  @column()
  public town: string | null
  @column()
  public country: string | null
  @column()
  public is_deleted: boolean | null
  @column()
  public start_date: DateTime | null
  @column()
  public end_date: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // à vérifier
  @hasMany(() => Project)
  public posts: HasMany<typeof Project>;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      try {
        user.password = await Hash.make(user.password)
      }
      catch (error) {
        Logger.error(error)
      }
    }
  }
}

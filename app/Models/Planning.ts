import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import UserProjects from 'Database/migrations/1657039928884_user_projects'
import Database from '@ioc:Adonis/Lucid/Database'

export default class Planning extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public dayDate: DateTime
  @column()
  public userProjectId: number 
  @column()
  public dayQuantity: number
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

  public static findAllNotDeleted() {
    return this.query().where({  isDeleted: false });
  }
  public static findNotDeleted(id?: number) {
    return this.query().where({ id, isDeleted: false }).first();
  }

  // public static  canHaveTicketRestaurant(id?:number) {
  //   return this.query().where({ id, isDeleted: false } ,'day_quantity', '<','1' && 'day_quantity !==0')
  // }
  // public static  canHaveTicketRestaurant(id?:number) {
  //  this Planning.query()
  // .preload('user_projects', query => query.where('day_quantity','<', '1','AND','day_quantity !==0'))
  // }
  
}



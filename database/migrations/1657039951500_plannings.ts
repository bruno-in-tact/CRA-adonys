import { DateTime } from 'luxon';
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Plannings extends BaseSchema {
  protected tableName = 'plannings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_project_id').unsigned().notNullable().references('id').inTable('user_projects')

      table.dateTime('day_date')
      table.float('day_quantity').nullable

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

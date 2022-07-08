import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Projects extends BaseSchema {
  protected tableName = 'projects'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary
      table.string('project_name').notNullable()
      table.string('project_key').notNullable()
      table.string('client_name').notNullable()
      table.string('project_details').nullable()
      table.boolean('restaurant_ticket').notNullable()
      table.boolean('is_deleted').nullable().defaultTo(false)
      table.timestamp('deleted_at', { useTz: true }).nullable()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

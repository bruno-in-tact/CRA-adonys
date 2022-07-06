import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserProjects extends BaseSchema {
  protected tableName = 'user_projects'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.integer('project_id').unsigned().notNullable().references('id').inTable('projects')
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

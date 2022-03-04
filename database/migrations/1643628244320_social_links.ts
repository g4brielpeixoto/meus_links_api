import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SocialLinks extends BaseSchema {
  protected tableName = 'social_links'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.string('title')
      table.string('url')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

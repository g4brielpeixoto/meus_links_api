import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    username: schema.string.optional({ trim: true }, [
      rules.unique({ table: 'users', column: 'username' })
    ]),
    name: schema.string.optional({ trim: true }),
    bio: schema.string.optional({ trim: true }),
    links: schema.array().members(
      schema.object().members({
        id: schema.number(),
        title: schema.string.nullableAndOptional(),
        url: schema.string.nullableAndOptional(),
        active: schema.boolean()
      })
    )
  })
  public messages = {}
}

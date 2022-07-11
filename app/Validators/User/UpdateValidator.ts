import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string.optional({ trim: true }),
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

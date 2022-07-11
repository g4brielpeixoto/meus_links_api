import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthStoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    username: schema.string.optional({ trim: true }, [
      rules.exists({ table: 'users', column: 'username' })
    ]),
    email: schema.string.optional({ trim: true }, [
      rules.exists({ table: 'users', column: 'email' })
    ]),
    password: schema.string()
  })
  public messages = {}
}

import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ForgotPasswordStoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    username: schema.string.optional({ trim: true }, [
      rules.exists({ table: 'users', column: 'username' })
    ]),
    email: schema.string.optional({ trim: true }, [
      rules.email(),
      rules.exists({ table: 'users', column: 'email' })
    ]),
    redirectUrl: schema.string({ trim: true })
  })
  public messages = {}
}

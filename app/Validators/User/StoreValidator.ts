import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserStoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    username: schema.string({ trim: true }, [rules.unique({ table: 'users', column: 'username' })]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' })
    ]),
    password: schema.string(),
    redirectUrl: schema.string({ trim: true })
  })
  public messages = {
    'username.unique': 'Este apelido já está em uso',
    'email.unique': 'Este e-mail já está em uso'
  }
}

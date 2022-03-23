import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany, computed } from '@ioc:Adonis/Lucid/Orm'
import { UserKey } from 'App/Models'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public username: string

  @column()
  public name: string

  @column()
  public validated: boolean

  @column()
  public avatar: string

  @column({ serialize: (links) => JSON.parse(links) })
  public links: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(() => UserKey)
  public keys: HasMany<typeof UserKey>

  @computed()
  public firstName() {
    return this.name.split(' ')[0]
  }

  @computed()
  public get avatarUrl(): string {
    return `https://meus-links-backend.herokuapp.com/avatar/${this.avatar}`
  }
}

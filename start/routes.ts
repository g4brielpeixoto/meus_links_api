import Route from '@ioc:Adonis/Core/Route'
import View from '@ioc:Adonis/Core/View'

Route.get('/', async () => {
  return View.render('emails/register')
})

//User
Route.post('/register', 'UsersController.store')
Route.get('/register/:key', 'UsersController.show')
Route.put('/register', 'UsersController.update').middleware('auth')

//Auth
Route.post('/auth', 'AuthController.store')
Route.delete('/auth', 'AuthController.destroy').middleware('auth')

//ForgotPassword
Route.post('/forgotPassword', 'ForgotPasswordController.store')
Route.put('/forgotPassword', 'ForgotPasswordController.update')

//MainLinks
Route.post('/mainlink', 'MainLinksController.store').middleware('auth')
Route.get('/mainlink', 'MainLinksController.show').middleware('auth')
Route.put('/mainlink/:id', 'MainLinksController.update').middleware('auth')
Route.delete('/mainlink/:id', 'MainLinksController.destroy').middleware('auth')

//SocialLink
Route.post('/sociallink', 'SocialLinksController.store').middleware('auth')
Route.get('/sociallink', 'SocialLinksController.show').middleware('auth')
Route.put('/sociallink/:id', 'SocialLinksController.update').middleware('auth')
Route.delete('/sociallink/:id', 'SocialLinksController.destroy').middleware('auth')

//Pages
Route.get('/:username', 'PagesController.show')

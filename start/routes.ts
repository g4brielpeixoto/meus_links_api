import Route from '@ioc:Adonis/Core/Route'
import View from '@ioc:Adonis/Core/View'

Route.get('/', async () => {
  return View.render('emails/forgotPassword')
})

//User
Route.post('/register', 'UsersController.store')
Route.get('/register/:key', 'UsersController.confirm')
Route.get('/register', 'UsersController.show').middleware('auth')
Route.put('/register', 'UsersController.update').middleware('auth')

//Auth
Route.post('/auth', 'AuthController.store')
Route.delete('/auth', 'AuthController.destroy').middleware('auth')

//ForgotPassword
Route.post('/forgot-password', 'ForgotPasswordController.store')
Route.get('/forgot-password', 'ForgotPasswordController.show')
Route.put('/forgot-password', 'ForgotPasswordController.update')

//Pages
Route.get('/:username', 'PagesController.show')

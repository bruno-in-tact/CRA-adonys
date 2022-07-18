import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserLoginValidator from 'App/Validators/Users/UserLoginValidator';

export default class SecurityController {

  /**
     * login
     */
  //  public async login({ auth, request, response }: HttpContextContract) {
  //   const payload = await request.validate(UserLoginValidator);


  //   try {

  //     await auth.use('web').attempt(payload.email, payload.password);
  //     return response.json({ message: 'Login successful' });

  //   } catch (err) {
  //     console.log(err)
  //     return response.badRequest({
  //       code: err.code,
  //       message: 'Login failed',
  //     });
  //   }
  // }

  public async login({ auth, request, response }: HttpContextContract) {

    const payload = await request.validate(UserLoginValidator);
    const token = await auth.attempt(payload.email, payload.password)
    const user = auth.user!

    return response.ok({
      user: {
        token: token.token,
        ...user.serialize(),
      },
    })
  }

  /**
   * logout
   */
  public async logout({ auth }: HttpContextContract) {
    await auth.use('web').logout();
    return { message: 'Logout successful' };
  }
}
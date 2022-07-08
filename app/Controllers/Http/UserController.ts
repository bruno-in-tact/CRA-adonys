import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/Users/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/Users/UpdateUserValidator'





export default class UserController {

  /*
   * index = GET ALL
   * Params: no
   */
  public async index({ }: HttpContextContract) {
    const users = await User.all()
    return users

  }

  /*
 * new =  create a new user
 * Params: request, response
 */
  public async new({ request, response }: HttpContextContract) {

    const userPayLoad = await request.validate(CreateUserValidator)
    const user = await User.create(userPayLoad)
    console.log(userPayLoad)

    return response.json({ user })

  }

  /**
    * FIND user by ID
    * Find User /users/:id
    */
  public async find({ params, response }: HttpContextContract) {
    const user = await User.find(params.id);
    return user
  }
  public async show({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    return user
  }

  /*
   * update =  update by id
   * Params: request, response
   */
  public async update({ request, params, response, }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    user.merge(await request.validate(UpdateUserValidator))
    user.save()

    return user

  }
  /**
 * Update user to isDeleted=true
 * Update User /users/soft-delete/:id
 */

  public async softDelete({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    user.isDeleted = true
    await user.save()

    return user
  }

  /**
   * Update user to Admin by id
   * Update Admin /users/setAdmin/:id
   */
  public async setToAdmin({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    user.isAdmin = true
    await user.save()

    return user
  }

  /**
 * DELETE user 
 * DELETE User /users/delete/:id
 */
  public async destroy({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user.delete()

    return user
  }
}



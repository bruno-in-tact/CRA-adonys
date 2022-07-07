import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUser from 'App/Validators/Users/CreateUserValidator'

import User from 'App/Models/User'

export default class UserController {
  public async index({ }: HttpContextContract) {
    try {
      const users = await User.all()
      return users

    } catch (error) {
      console.log(error)

    }
  }

  public async new({ request}: HttpContextContract) {

    try {
      const userPayLoad = await request.validate(CreateUser)
      const body = request.body()
      const user = await User.create(userPayLoad)
      
      return {
        message :'User has been created',
        data: user,
      }
    } catch (error) {
      console.log(error)
    }
  }


  public async find({ params }: HttpContextContract) {
    try {
      const user = await User.find(params.id)
      // SQL: SELECT * from "users" WHERE "id" = 1 LIMIT 1;
      return user

    } catch (error) {
      console.log(error)
    }
  }

  public async show({ params }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      return user

    } catch (error) {
      console.log(error)
    }
  }

  public async update({ request, params}: HttpContextContract) {

    try {
      const updateData = request.all()
      const user = await User.findOrFail(params.id)
      user.merge(updateData)
      await user.save()
      return user

    } catch (error) {
      console.log(error)

    }
  }

  public async softDelete({ }: HttpContextContract) { }
}

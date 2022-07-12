import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'
import UserProject from 'App/Models/UserProject'
import CreateUserProjectValidator from 'App/Validators/UsersProjects/CreateUserProjectValidator'
import UpdateUserProjectValidator from 'App/Validators/UsersProjects/UpdateUserProjectValidator'
import Project from 'App/Models/Project';
import User from 'App/Models/User';
import { MyError } from 'App/Exceptions/MyError'
import Project from 'App/Models/Project'

export default class UserProjectsController {
  /*
   * index = GET ALL
   * Params: no
   */
  public async index({ }: HttpContextContract) {
    const usersProjects = await UserProject.all()
    return usersProjects

  }


  /*
* allNotDeleted =  find all usersProject not soft deleted
* Params: none
*  GET : userProject/get
*/
  public async getAllNotDeleted({ }: HttpContextContract) {
    const allNotDeleted = await UserProject.findAllNotDeleted()
    return allNotDeleted
  }
  /*
 * new =  create a new userProject
 * Params: request, response
 */
  public async new({ request, params, response }: HttpContextContract) {
    // const userId = params.userId;
    // const projectId = params.projectId;
    // const project = await Project.findNotDeleted(projectId);
    // const user = await User.findNotDeleted(userId);

    // if (!project) {
    //   return response.unprocessableEntity({
    //     errors: [
    //       {
    //         field: 'projectId',
    //         rule: 'exists',
    //       },
    //     ],
    //   });
    // }
    // if (!user) {
    //   return response.unprocessableEntity({
    //     errors: [
    //       {
    //         field: 'user',
    //         rule: 'exists',
    //       },
    //     ],
    //   });
    // }

    const userProjectPayLoad = await request.validate(CreateUserProjectValidator)
    const userProject = await UserProject.create(userProjectPayLoad)
    if (!userProject) {
      return response.notFound();
    }
    console.log(userProjectPayLoad)

    return userProject


  }

  /**
    * FIND user by ID
    * Find User /userProject/:id
    */
  public async find({ params }: HttpContextContract) {
    const userProject = await UserProject.findNotDeleted(params.id);
    return userProject
  }
  /*
   * update =  update by id
   * Params: request, response
   */
  public async update({ request, params, response }: HttpContextContract) {

    const userProject = await UserProject.findNotDeleted(params.id)
    userProject?.merge(await request.validate(UpdateUserProjectValidator))

    const user = await User.find(request.body().user_id)
    const project = await Project.find(request.body().project_id)
    if (project && user) {
      userProject.save()
    } else if (!project) {
      return response.unprocessableEntity({
        errors: [
          {
            field: 'project_id',
            rule: 'exists',
          },
        ],
      });
    } else if (!user) {
      return response.unprocessableEntity({
        errors: [
          {
            field: 'user_id',
            rule: 'exists',
          },
        ],
      });
      console.log('ERROR');
      throw new MyError();
    }
    return userProject


  }
  /**
 * Update user to isDeleted=true
 * Update User /userProject/soft-delete/:id
 */

  public async softDelete({ params }: HttpContextContract) {
    const userProject = await UserProject.findOrFail(params.id)
    userProject.isDeleted = true
    await userProject.save()

    return userProject
  }


  /**
 * DELETE userProject 
 * DELETE User /userProject/delete/:id
 */
  public async destroy({ params }: HttpContextContract) {
    const userProject = await UserProject.findOrFail(params.id)
    await userProject.delete()

    return userProject
  }
}

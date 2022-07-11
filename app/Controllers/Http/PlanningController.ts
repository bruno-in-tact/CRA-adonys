import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Planning from 'App/Models/Planning'
import UpdatePlanningValidator from 'App/Validators/Plannings/UpdatePlanningValidator'
import CreatePlanningValidator from 'App/Validators/Plannings/CreatePlanningValidator'

export default class PlanningsController {

  /*
   * index = GET ALL
   * Params: no
   */
  public async index({ }: HttpContextContract) {
    const plannings = await Planning.all()
    return plannings

  }

  /*
 * new =  create a new planning
 * Params: request, response
 */
  public async new({ request }: HttpContextContract) {
    const planingPayLoad = await request.validate(CreatePlanningValidator)
    const planning = await Planning.create(planingPayLoad)
    console.log(planingPayLoad)

    return planning

  }

  /**
    * FIND planning by ID
    * Find Planning /users/:id
    */
  public async find({ params, response }: HttpContextContract) {
    const planning = await Planning.find(params.id);
    return planning
  }
  /*
   * update =  update by id
   * Params: request, response
   */
  public async update({ request, params, response, }: HttpContextContract) {
    const planning = await Planning.findOrFail(params.id)

    planning.merge(await request.validate(UpdatePlanningValidator))
    planning.save()

    return planning

  }
  /**
 * Update planning to isDeleted=true
 * Update Planning /users/soft-delete/:id
 */

  public async softDelete({ params }: HttpContextContract) {
    const planning = await Planning.findOrFail(params.id)
    planning.isDeleted = true
    await planning.save()

    return planning
  }



  /**
 * DELETE planning 
 * DELETE Planning /users/delete/:id
 */
  public async destroy({ params }: HttpContextContract) {
    const planning = await Planning.findOrFail(params.id)
    await planning.delete()

    return planning
  }
}

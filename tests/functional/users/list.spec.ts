import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { UserFactory } from 'Database/factories'
import { faker } from '@faker-js/faker';
import { assert } from '@japa/preset-adonis';
import Logger from '@ioc:Adonis/Core/Logger'


test.group('List users', (group) => {

  group.each.setup(async () => {

    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()

  })

  test('return an ampty list when  no users', async ({ client }) => {
    const response = await client.get('/users')
    // response.assertBody({ meta: { total: 0 }, data: [] })
    console.log(response.body())
    console.log(response)

  })

  test('- create a user ', async ({ client, assert, route }) => {
    const fakeUser = await UserFactory.query().create()
    const response = await client.post(route('UserController.new')).form(fakeUser);
    const body = response.body();
    console.log('body : ',body)
    response.dumpBody()

    response.assertStatus(404)
    response.assertBodyContains({
      errors: [{message: ""}]
    })


     assert.equal(body.first_name, fakeUser.firstName);
    assert.equal(body.email, fakeUser.email);
     const user = await User.find(body.id);
     assert.notEqual(user?.password, fakeUser.password);
  });
  
  test('get a paginated list of users', async ({ client, route }) => {

    //await UserFactory.query().with()
    const user = await UserFactory.query().create()
    const response = await client.post(route('UserController.getAllNotDeleted'))
    const body = response.body();
    // assert(body.first_name, user. );

    // response.assertStatus(200)
    // response.assertBodyContains({
    //   errors: [{ message: 'required validation failed', field: 'email' }]
    // })
    console.log(response.body())
  })


  test('create a user without first_name', async ({ client, assert, route }) => {
    const fakeUser = {
      last_name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  
    const response = await client.post(route('UserController.new')).form(fakeUser);
    const body = response.body();
    const status = response.status();
    assert.equal(status, 422);
    assert.isObject(body);
    assert.exists(body.errors);
    assert.isArray(body.errors);
    assert.equal(body.errors.length, 1);
    assert.exists(body.errors[0].field);
    assert.equal(body.errors[0].field, 'first_name');
    assert.equal(body.errors[0].rule, 'required');
  });

  test('create a user with content ', async ({ client, route }) => {

    //await UserFactory.query().with()
    const response = await client.post(route('UserController.new')).form({
      first_name: 'bruno',
      last_name:'zilio',
      email:'bruno.zilio@in-tact.fr',
    })
    response.dumpBody()
    response.assertStatus(404)
    response.assertBodyContains({
      errors: [{ message: 'required validation failed', field: 'email' }]
    })
    console.log(response.body())
   })
})
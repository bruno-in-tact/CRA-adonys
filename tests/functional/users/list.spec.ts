import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { UserFactory } from 'Database/factories'
import { faker } from '@faker-js/faker';
import { assert } from '@japa/preset-adonis';


test.group('List users', (group) => {

  group.each.setup(async () => {

    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()



  })

  test('return an ampty list when  no users', async ({ client }) => {

    const response = await client.get('/users')
    // response.assertBody({ meta: { total: 0 }, data: [] })
    console.log(response.body())

  })

  test('- create a user ', async ({ client, assert }) => {
    const fakeUser = {
      first_name: faker.name.findName(),
      last_name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      start_date: "2021-10-08",
      town: faker.random.word(),
      country: faker.random.word(),
      // is_admin: 0
    }
    const response = await client.post('/api/users/new').form(fakeUser);
    const body = response.body();
    assert.equal(body.first_name, fakeUser.first_name);
    assert.equal(body.email, fakeUser.email.toLocaleLowerCase());
    const user = await User.find(body.id);
    assert.notEqual(user?.password, fakeUser.password);
  });


  test('- create a user without password ', async ({ client, assert }) => {
    const fakeUser = {
      first_name: faker.name.findName(),
      last_name: faker.name.findName(),
      email: faker.internet.email(),
      start_date: "2021-10-08",
      town: faker.random.word(),
      country: faker.random.word(),
      // is_admin: 0
    }
    const response = await client.post('/api/users/new').form(fakeUser);
    const body = response.body();
    const status = response.status();
    assert.equal(status, 422);
    assert.isObject(body);
    assert.assert({
      errors: [{
        rule: 'required',
        field: 'password',
        message: "The field 'password' is required"
      }]
    })
  });
})
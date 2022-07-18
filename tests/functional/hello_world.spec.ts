import { test } from '@japa/runner'

test.group('', ()=> {

  test('get a list of every user', async ({ client }) => {
    const response = await client.get('/users')
  
    response.assertStatus(200)
    response.assertBodyContains({ hello: 'world' })
  })
}) 


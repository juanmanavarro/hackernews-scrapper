'use strict'

const { test, trait } = use('Test/Suite')('Hacker News')

trait('Test/ApiClient')

test('return 404 if page is not an integer', async ({ client }) => {
  const response = await client.get('/random-string').end()

  response.assertStatus(404)
})

test('return page 1 if no page requested', async ({ assert, client }) => {
  const response = await client.get('/').end()

  response.assertStatus(200)
  assert.lengthOf(response.body, 30)
  assert.ownInclude(response.body[0], { id: '1' })
  assert.hasAllKeys(response.body[0], [ 'id', 'title', 'url' ])
})

test('return requested page with content', async ({ assert, client }) => {
  const page = 2;
  const response = await client.get(`/${page}`).end()

  response.assertStatus(200)
  assert.ownInclude(response.body[0], { id: `${( (page - 1 ) * 30 ) + 1}` })
  assert.isAtLeast(response.body.length, 1)
})

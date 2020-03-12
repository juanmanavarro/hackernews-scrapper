'use strict'

const { test, trait } = use('Test/Suite')('Hacker News')

trait('Test/ApiClient')

test('return 404 if page is not an integer', async ({ client }) => {
  const response = await client.get('/random-string').end()
  response.assertStatus(404)
})

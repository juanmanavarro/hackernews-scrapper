'use strict'

const { test } = use('Test/Suite')('Response')
const { responseData } = use('App/Helpers/response')

test('compose page 1 response', async ({ assert }) => {
  let posts = []
  posts = await responseData(1, posts)

  assert.lengthOf(posts, 30)
  assert.deepEqual(posts.map(post => parseInt(post.id) - 1), [...Array(30).keys()])
}).timeout(0)

test('compose page 2 response', async ({ assert }) => {
  let posts = []
  posts = await responseData(2, posts)

  assert.lengthOf(posts, 60)
  assert.deepEqual(posts.map(post => parseInt(post.id) - 1), [...Array(60).keys()])
}).timeout(0)

test('compose page without content response', async ({ assert }) => {
  const page = 30
  let posts = []
  posts = await responseData(page, posts)

  assert.isBelow(posts.length, 30 * page)
}).timeout(0)

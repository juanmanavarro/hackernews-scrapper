'use strict'

const { test } = use('Test/Suite')('Scraper')
const { getPagePosts } = use('App/Helpers/scraper')

test('scrape page 1', async ({ assert }) => {
  let posts = await getPagePosts(1)

  assert.equal(posts.length, 30)
})

test('scrape empty page', async ({ assert }) => {
  let posts = await getPagePosts(1000)

  assert.equal(posts.length, 0)
})

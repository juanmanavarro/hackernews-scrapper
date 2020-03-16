'use strict'

const { getPagePosts } = use('App/Helpers/scraper')

const responseData = async (page, posts) => {
    let pagePosts = await getPagePosts(page)

    posts = pagePosts.concat(posts)

    page--

    return ! pagePosts.length || page >= 1 ? responseData(page, posts) : posts
}

module.exports = {
    responseData,
}

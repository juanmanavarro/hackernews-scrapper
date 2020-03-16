'use strict'

const Axios = use('axios')
const Cheerio = use('cheerio')
const Cache = use('Cache')

const getPagePosts = async page => {
    return await Cache.remember(page, 5, async () => {
        let pageResponse

        try {
            pageResponse = await Axios.get(`https://news.ycombinator.com/news?p=${page}`)
            let posts = transformPageData(pageResponse.data)

            await Cache.put(page, posts, 1)

            return posts
        } catch (error) {
            return []
        }
    })
}

// here for simplicity
const transformPageData = pageResponseData => {
    let posts = []

    const $ = Cheerio.load(pageResponseData)

    posts = $('.athing').map((index, post) => {
        return {
            id: $(post).find('.rank').text().slice(0, -1),
            title: $(post).find('.storylink').text(),
            url: $(post).find('.storylink').attr('href'),
        }
    }).toArray()

    return posts
}

module.exports = {
    getPagePosts,
}

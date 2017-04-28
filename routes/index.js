const express = require('express')
const router = express.Router()
const tumblr = require('tumblr.js')

const client = tumblr.createClient({
  credentials: {
    consumer_key: process.env.TUMBLR_CONSUMER_KEY
  },
  returnPromises: true,
})
/* GET home page. */
router.get('/latest-posts', function(req, res, next) {
  const data = Promise.all([
    client.blogPosts('rivervalleytrailboss.tumblr.com', {limit: 5}),
    client.blogPosts('lowelllara.tumblr.com', {limit: 5}),
    client.blogPosts('flatriverrailtrail.tumblr.com', {limit: 5}),
    client.blogPosts('grandrivertrail.tumblr.com', {limit: 5})
  ])
  .then(blogs => {
    const data = blogs.map(item => {
      return {
        title: item.blog.title,
        url: item.blog.url,
        posts: item.posts
      }
    })
    res.send(data)
  })
})

module.exports = router

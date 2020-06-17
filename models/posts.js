const marked = require('marked')
const Post = require('../lib/mongo').Post

Post.plugin('contentToHtml', {
  afterFind: (posts) => {
    return post.map(({ content, ...args }) => ({
      ...args,
      content: marked(content)
    }))
  },
  afterFindOne: post => {
    if (post) {
      post.content = marked(post.content)
    }
    return post
  }
})

module.exports = {
  // 创建一篇文章
  create: function create(post) {
    return Post.create(post).exec()
  }
}
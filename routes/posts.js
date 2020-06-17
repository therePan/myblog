const express = require('express')
const PostModel = require('../models/posts')

const router = express.Router()

const checkLogin = require('../middlewares/check').checkLogin

// GET /posts 所有用户或者特定用户的文章页
//   eg: GET /posts?author=xxx
router.get('/', function (req, res, next) {
  res.render('posts')
})

// POST /posts/create 发表一篇文章
router.post('/create', checkLogin, (req, res, next) => {
  const author = req.session.user._id
  const { title, content } = req.fields
  // 校验参数
  try {
    if (!title.length) {
      throw new Error('请填写标题')
    }
    if (!content.length) {
      throw new Error('请填写内容')
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('back')
  }

  let post = { author, title, content }

  PostModel.create(post).then(result => {
    const { ops: [{ _id }] } = result
    req.flash('success', '发表成功')
    res.redirect(`/posts/${_id}`)
  })
})

// GET /posts/create 发表文章页
router.get('/create', checkLogin, (req, res, next) => {
  res.render('create')
})

// GET /posts/:postId 单独一篇的文章页
router.get('/:postId', function (req, res, next) {
  res.send('文章详情页')
})

// GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit', checkLogin, function (req, res, next) {
  res.send('更新文章页')
})

// POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin, function (req, res, next) {
  res.send('更新文章')
})

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin, function (req, res, next) {
  res.send('删除文章')
})

module.exports = router

const router = require('express').Router()
const auth = require('../middleware/auth');
const { BulletinBoard, validatePost } = require('../models/bulletinBoard');

// Get all posts
router.get('/', auth, async (req, res) => {
  const posts = await BulletinBoard.find();
  res.send(posts);
});

// Create new post
router.post('', auth, async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const bulletinBoard = new BulletinBoard(req.body);
  bulletinBoard.save();

  res.send(bulletinBoard);
});

// Get a single post
router.get('/:id', auth, async (req, res) => {
  const post = await BulletinBoard.findById(req.params.id);
  if (post) return res.send(post);
  res.sendStatus(404);
});

// Delete a single post
router.delete('/:id',auth, async (req, res) =>{
    const result = await BulletinBoard.deleteOne({_id: req.params.id});
    res.send(result);
})

module.exports = router
//const express = require('express')
const router = require('express').Router()
const { User, validateUser} = require('../models/user')
const { hashPassword } = require('../utils/hash')
const auth = require('../middleware/auth')

router.post('/', async (req, res)=>{
  const {error} = validateUser(req.body);
  if(error) return res.status(400).json(error.details[0].message);

  const isUnique = (await User.count({username: req.body.username})) === 0;
  if(!isUnique)

  return res
    .status(400)
    .json({ error: 'The username or password is not valid'});

  try{
    const user = new User(req.body);
    user.password = await hashPassword(user.password);
    await user.save();
  } catch (err){
    return res.status(500).json(err);
  }
  res.sendStatus(201);
});




router.post('/login', (req, res) => {
    let fetchedUser;
    User.findOne({username: req.body.username})
    .then(result =>{
        if(!result)
        {
          return res.status(401).json(
            {
              message: "Authentication Failure"
            });
        }

        const token = jwt.sign({username:fetchedUser.username, userid:fetchedUser._id},
                      'secret_this_should_be_longer_than_it_is',
                      {expiresIn:'1h'});

        res.status(200).json({token: token});
    })
    .catch(err =>{
      return res.status(401).json({
        message: "Authetication Failure"
      });
    })
})

module.exports = router
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll()
  .then(dbCategoryData => res.json(dbCategoryData))
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    }


  }).
  then(dbUserData => {
    if(!dbUserData){
      res.status(404).json({ message: 'No user found with this id'})
      return
    }
    res.json(dbUserData)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })

});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  }).then(dbUserData => res.json(dbUserData))
  .catch(err => {
      console.log(err)
      res.status(500).json(err)
  })
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    } 
  }).then(dbUserData => {
    if(!dbUserData[0]){
      res.status(404).json({ message: 'No user found with this id' })
      return
    }
    res.json(dbUserData)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
})
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where:{
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if(!dbUserData){
        res.status(404).json({ message: 'No user found with this id' })
        return
    }
    res.json(dbUserData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

module.exports = router;

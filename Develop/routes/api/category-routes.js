const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {

  try {
    const categories = await Category.findAll({
      
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
 
  try {
    const singleCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!singleCategory) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(singleCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
 
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  
  try {
    const updatedCategory = await Category.update(
      { category_name: req.body.category_name, },
      {
        where: {
          id: req.params.id,
        }
      }
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

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
  console.log(err);
}
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!category) {
      res.status(404).json({ message: 'Invalid id!' });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const category = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
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
    console.log(err);
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
    try {
      const deleteCategory = await Category.destroy({
        where: {
          id: req.params.id,
        }
      });
      res.status(200).json(deleteCategory);
    } catch (err) {
      res.status(400).json(err);
    }
  }
});

module.exports = router;

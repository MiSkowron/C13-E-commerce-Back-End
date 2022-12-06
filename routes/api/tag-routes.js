const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!singleTag) {
      res.status(404).json({ message: 'Invalid id!' });
      return;
    }

    res.status(200).json(singleTag);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(
      { tag_name: req.body.tag_name, },
      {
        where: {
          id: req.params.id,
        }
      }
    );
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.status(200).json(deletedTag);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

module.exports = router;

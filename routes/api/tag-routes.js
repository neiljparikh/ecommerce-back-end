const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    //if tag doesn't exist, it will send back an error message
    if (!tagData) {
      res.status(404).json({ message: "No tag found" });
      return;
    }
    //sends back requested data
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    //if the tag doesn't exist, it will send back an error message
    if (!tagData) {
      res.status(404).json({ message: "No tag found" });
      return;
    }
    //sends back updated data
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    //check if tag exists, if it doesn't it will return an error message
    if (!tagData) {
      res.status(404).json({ message: "No tag found" });
      return;
    }
    //sends back rows affected
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

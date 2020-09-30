const express = require('express');
const Joi = require('@hapi/joi');
const { validateBody } = require('../middlewares/route');

const router = express.Router();

router.post(
  '/',
  validateBody(Joi.object().keys({
    payload: Joi.object(),
    referenceData: Joi.object(),
  }),
  {
    stripUnknown: true,
  }),
  async (req, res, next) => {
    try {
      let refrencedata = req.body.referenceData;
      let payload = req.body.payload;
      let result = replacer(JSON.stringify(payload), refrencedata);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
);

function replacer(template, obj) {
    for (var key of Object.keys(obj)) {
        template = template.replace(new RegExp('{' + key + '}', 'gi'), obj[key]);  
    }
    return JSON.parse(template);
  }

module.exports = router;
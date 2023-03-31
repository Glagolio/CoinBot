const Joi = require("joi");

const schemaEmail = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ["com", "net", "ua"] },
});

const schemaPassword = Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"));

const validateEmail = (email) => {
  return schemaEmail.validate(email);
};

const validatePassword = (password) => {
  return schemaPassword.validate(password);
};

module.exports = { validateEmail, validatePassword };

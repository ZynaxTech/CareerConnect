const yup = require("yup");

const userSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(4, "Username must be atleast of 4 characters")
    .required(),
  email: yup.string().email("The email is not valid one").required(),
  password: yup
    .string()
    .min(8, "Password must be atleast 8 character")
    .required(),
});

const validateUser = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }
};

module.exports = { userSchema, validateUser };

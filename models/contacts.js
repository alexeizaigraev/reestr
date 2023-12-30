const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");
const nameRegexp = /^[a-zA-Zа-яА-ЯґҐєЄіІїЇ]+(([' -][a-zA-Zа-яА-ЯґҐєЄіІїЇ ])?[a-zA-Zа-яА-ЯґҐєЄіІїЇ]*)*$/;
const phoneRegexp =
  /^((\+)?(3)?(8)?[- ]?)?(\(?\d{3}\)?[- ]?)?\d{3}[- ]?\d{2}[- ]?\d{2}$/;
  const dateRegexp = /^\d{2}\.\d{2}\.\d{4}$/;

const contactSchema = new Schema(
  {
    n: {
      type: Number,
      required: [true, "Set n  for reestr"],
    },
    form: {
      type: String,
      required: [true, "Set form  for reestr"],
    },
    number: {
      type: String,
      required: [true, "Set namber  for reestr"],
    },
    fio: {
      type: String,
      required: [true, "Set fio  for reestr"],
    },
    edrpu: {
      type: Number,
      required: [true, "Set edrpu  for reestr"],
    },
    passport: {
      type: String,
      required: [true, "Set passport  for reestr"],
    },
    birthday: {
      type: Date,
      required: [true, "Set birthday  for reestr"],
    },
    
    registrationplase: {
      type: String,
      required: [true, "Set registrationplase  for reestr"],
    },
    adress: {
      type: String,
      required: [true, "Set adress  for reestr"],
    },
    phone: {
      type: String,
      match: phoneRegexp,
      required: [true, "Set phone for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },

    membershipfee: {
      type: Number,
      required: [true, "Set membershipfee  for reestr"],
    },
    share: {
      type: Number,
      required: [true, "Set share  for reestr"],
    },
    payshare: {
      type: Number,
      required: [true, "Set payshare  for reestr"],
    },

    avatarUrl: {
      type: String,
      required: true,
    },


    // name: {
    //   type: String,
    //   match: nameRegexp,
    //   required: [true, "Set name for contact"],
    // },
    
    
    // "n": 1,
    // "form": "Ч",
    // "namber": "UA118888886740110000000111111",
    // "fio": "Корж Юрій Віталійович",
    // "edrpu": "2578202972",
    // "passport": "Паспорт СН 044371 виданий Шевченківським РУ ГУ МВС України в м.Києві 01.02.1996р.",
    // "birthday": "03.08.1970",
    // "registrationplase": "Україна,04086,місто Київ,вул.Олени Теліги,37-Е,кв.61",
    // "adress": "Україна,04086,місто Київ,вул.Олени Теліги,37-Е,кв.61",
    // "phone": "+380 (50) 469-96-55",
    // "email": "korzh@dovira.com",
    // "membershipfee": "35000,00 грн",
    // "share": "96000,00 грн",
    // "payshare": ""

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
contactSchema.post("save", handleMongooseError);

const contactAddSchema = Joi.object({
  n: Joi.number().max(30).required().messages({
    "any.required": "field 'n' is missing",
    "string.pattern.base":
      "n may contain only number",
  }),
  form: Joi.string().required().messages({
    "any.required": "field 'form' is missing",
  }),
  number: Joi.string().required().messages({
    "any.required": "field 'number' is missing",
  }),
  edrpu: Joi.number().required().messages({
    "any.required": "field 'edrpu' is missing",
  }),
  passport: Joi.string().required().messages({
    "any.required": "field 'passport' is missing",
  }),
  birthday: Joi.date().required().messages({
    "any.required": "field 'birthday' is missing",
    "string.pattern.base": "field 'birthday' must be in the format 'dd.MM.YYYY'",
}),

  registrationplase: Joi.string().required().messages({
    "any.required":   "field 'registrationplase' is missing",
  }),
  adress: Joi.string().required().messages({
    "any.required": "field 'adress' is missing",
  }),

  fio: Joi.string().min(3).max(40).pattern(nameRegexp).required().messages({
    "any.required": "field 'name' is missing",
    "string.pattern.base":
      "fio may contain only letters, apostrophe, dash, and spaces. For example, Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
  }),


  email: Joi.string().email().required().messages({
    "any.required": "field 'email' is missing",
  }),
  phone: Joi.string().pattern(phoneRegexp).required().messages({
    "any.required": "field 'phone' is missing",
    "string.pattern.base":
      "Phone number must be a valid phone number for region UA, digits and can contain spaces, dashes, parentheses and can start with +",
  }),
  membershipfee: Joi.number().required().messages({
    "any.required": "field 'membershipfee' is missing",
  }),
  share: Joi.number().required().messages({
    "any.required": "field 'share' is missing",
  }),
  payshare: Joi.number().required().messages({
    "any.required": "field 'payshare' is missing",
  }),
  avatarUrl: Joi.string().required().messages({
    "any.required": "field 'avatarUrl' is missing",
    "string.pattern.base":
      "avatarUrl may contain only letters, apostrophe, dash, and spaces. For example, Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
  }),

 
});

const updateFavoriteSchema = Joi.object({
  avatarUrl: Joi.string()
    .required()
    .messages({ "any.required": "Missing field avatarUrl" }),
});

const schemas = { contactAddSchema, updateFavoriteSchema };

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };

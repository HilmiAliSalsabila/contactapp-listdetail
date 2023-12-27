const mongoose = require('mongoose');
const { Schema } = mongoose;
const dbUrl = 'mongodb+srv://hilmialisalsabila:hilmialisalsabila@cluster0.1s9d0si.mongodb.net/dbcontact?retryWrites=true&w=majority';

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

const contactSchema = new Schema(
  {
    nama: String,
    tempatlahir: String,
    nohp: String,
    email: String,
    pekerjaan: String,
    alamat: String,
    agama: String,
  },
  { timestamps: true }
);

const contact = mongoose.model('contact', contactSchema);

module.export = contact;

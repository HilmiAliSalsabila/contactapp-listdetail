const contact = require('./model');

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact, addContact, deleteContact, updateContacts } = require('./utils/contact');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Third-party Middleware
app.use(expressLayouts);

//Built-in middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200);
  const mahasiswa = [
    {
      nama: 'Asep',
      email: 'asep@gmail.com',
    },

    {
      nama: 'Usro',
      email: 'usro@gmail.com',
    },
  ];

  res.render('index', { nama: 'Hilmi Ali', title: 'Halaman Index', layout: 'layouts/main-layout', mahasiswa: mahasiswa });
  //   res.sendFile('./index.html', { root: __dirname });
});
app.get('/about', (req, res) => {
  res.status(200);
  res.render('about', {
    layout: 'layouts/main-layout',
    title: 'Halaman About',
  });

  //   res.send('<h1>Halo! ini adalah halaman about</h1>');
  //   res.json({
  //     nama: 'Hilmi',
  //     email: 'alihilmi93@gmail.com',
  //     telp: '082216010963',
  //   });
  //   res.sendFile('./about.html', { root: __dirname });
});

app.get('/contact/', (req, res) => {
  res.status(200);
  const contacts = loadContact();

  res.render('contact', {
    layout: 'layouts/main-layout',
    title: 'Halaman Contact',
    contacts,
  });
});

//halaman form tambah data contact
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    title: 'Form Tambah Data Contact',
    layout: 'layouts/main-layout',
  });
});

//proses data contact
// Menambahkan contact ke MongoDB
app.post('/contact', async (req, res) => {
  const { nama, tempatlahir, nohp, email, pekerjaan, alamat, agama } = req.body;

  try {
    // Membuat instance Contact dari model
    const contact = new Contact({
      nama,
      tempatlahir,
      nohp,
      email,
      pekerjaan,
      alamat,
      agama,
    });

    // Menyimpan ke MongoDB
    await newContact.create();

    // Redirect ke halaman contact setelah berhasil
    res.redirect('/contact');
  } catch (error) {
    // Tangani error jika ada
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//proses delete contact
app.get('/contact/delete/:nama', (req, res) => {
  const contact = findContact(req.params.nama);
  if (!contact) {
    res.status(404);
    res.send('<h1>404</h1>');
  } else {
    deleteContact(req.params.nama);
    res.redirect('/contact');
  }
});

// form ubah data contact
app.get('/contact/edit/:nama', (req, res) => {
  const contact = findContact(req.params.nama);
  res.render('edit-contact', {
    title: 'Form Ubah Data Contact',
    layout: 'layouts/main-layout',
    contact,
  });
});

// proses ubah data
app.post('/contact/update', (req, res) => {
  updateContacts(req.body);
  res.redirect('/contact');
});

//halaman detail contact
app.get('/contact/:nama', (req, res) => {
  res.status(200);
  const contact = findContact(req.params.nama);

  res.render('detail', {
    layout: 'layouts/main-layout',
    title: 'Halaman Detail Contact',
    contact,
  });

  //   res.sendFile('./contact.html', { root: __dirname });
});

// app.get('/product/:id', (req, res) => {
//   res.send('Product ID: ' + req.params.id);
// });

// app.get('/product/:id/category/:idCat', (req, res) => {
//   res.send(`Product ID: ${req.params.id} and Category ID: ${req.params.idCat}`);
// });

// app.get('/product', (req, res) => {
//   res.send(`Label Product: ${req.query.label}`);
// });

// app.use('/', (req, res) => {
//   res.status(404);
//   res.send('<h1>Halaman tidak ditemukan</h1>');
// });

app.use('/', (req, res) => {
  res.status(404);
  res.render('error', {
    title: 'Error 404',
    message: 'Halaman tidak ditemukan',
    url: req.originalUrl,
  });

  res.send('<h1>404</h1>');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

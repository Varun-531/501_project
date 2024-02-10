// // // internships.js
// // const express = require('express');
// // const router = express.Router();
// // const { isAdmin } = require('../middleware');
// // const { Internship } = require("../models/internships");

// // router.get('/', isAdmin, (req, res) => {
// //   const year = new Date().getFullYear();
// //   res.render('internships', { year });
// // });

// // router.post('/create-internship', isAdmin, async (req, res) => {
// //   const { title, description, location, start_date, end_date } = req.body;

// //   try {
// //     console.log('====================================');
// //     console.log("okok");
// //     console.log('====================================');
// //     // Assuming your Internship model has fields: title, description, location, start_date, end_date
// //     const newInternship = await Internship.create({
// //       title,
// //       description,
// //       location,
// //       start_date,
// //       end_date,
// //     });

// //     console.log('Internship created successfully:', newInternship);

// //     // Redirect to the internships page after creating an internship
// //     res.redirect('/internships');
// //   } catch (error) {
// //     console.log('====================================');
// //     console.log("okok2");
// //     console.log('====================================');
// //     console.error('Error creating internship:', error);
// //     res.status(500).send('Internal Server Error');
// //   }
// // });

// // module.exports = router;


// // internships.js
// const express = require('express');
// const router = express.Router();
// const { isAdmin } = require('../middleware');
// const { Internship } = require("../models/internships");

// router.get('/', isAdmin, (req, res) => {
//   const year = new Date().getFullYear();
//   res.render('internships', { year });
// });

// router.post('/create-internship', isAdmin, async (req, res) => {
//   // Your create-internship logic here
//   const { title, description, location, start_date, end_date } = req.body;

//     try {
//       console.log('====================================');
//       console.log("okok");
//       console.log('====================================');
//       // Assuming your Internship model has fields: title, description, location, start_date, end_date
//       const newInternship = await Internship.create({
//         title,
//         description,
//         location,
//         start_date,
//         end_date,
//       });

//       console.log('Internship created successfully:', newInternship);

//       // Redirect to the internships page after creating an internship
//       res.redirect('/internships');
//     } catch (error) {
//       console.log('====================================');
//       console.log("okok2");
//       console.log('====================================');
//       console.error('Error creating internship:', error);
//       res.status(500).send('Internal Server Error');
//     }
// });

// module.exports = router;


// internships.js
const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware');
const { Internship } = require("../models/internships");

router.get('/', isAdmin, (req, res) => {
  const year = new Date().getFullYear();
  res.render('internships', { year });
});

// router.post('/create-internship', isAdmin, async (req, res) => {
//   const { title, description, location, start_date, end_date } = req.body;

//   try {
//     // Assuming your Internship model has fields: title, description, location, start_date, end_date
//     const newInternship = await Internship.create({
//       title,
//       description,
//       location,
//       start_date,
//       end_date,
//     });

//     console.log('Internship created successfully:', newInternship);

//     // Redirect to the internships page after creating an internship
//     res.redirect('/internships');
//   } catch (error) {
//     console.error('Error creating internship:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

module.exports = router;

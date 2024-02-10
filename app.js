// app.js
const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("./config/passport");
const { User } = require("./models/user");
const adminRoutes = require("./routes/admin");
const { Internships } = require('./models/internships');
const { isAdmin } = require('./middleware'); // Adjust the path accordingly
const path = require('path');


// Set up EJS as the view engine
app.set("view engine", "ejs");
// app.use(express.static("public")); 
// Use body-parser middleware to parse POST request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use express-session for managing sessions
app.use(
  session({ secret: "your-secret-key", resave: true, saveUninitialized: true })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Use connect-flash for displaying flash messages
app.use(flash());

// Middleware to make user available in all views
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// Define routes

// Home route
app.get("/", (req, res) => {
  res.render("index", {
    title: "Student Hub",
    slogan: "Your go-to place for educational resources",
    year: new Date().getFullYear(),
  });
});

// Login route
app.get("/login", (req, res) => {
  res.render("login", {
    title: "Student Hub",
    year: new Date().getFullYear(),
    errorMessage: req.flash("error"),
  });
});

// Signup route
app.get("/signup", (req, res) => {
  res.render("signup", {
    title: "Student Hub",
    year: new Date().getFullYear(),
    confirmationMessage: null,
  });
});

// Home route
// app.get("/home", (req, res) => {
//   const user = req.user;

//   if (!user) {
//     return res.redirect("/login");
//   }

//   res.render("home", {
//     title: "Student Hub",
//     year: new Date().getFullYear(),
//     user: user,
//     isAdmin: user.is_admin || false,
//   });
// });

// Assuming you have a route for displaying internships
// Assuming you have a route for displaying internships
app.get("/internships", (req, res) => {
  // Fetch and render internships
  res.render("internships", {
    title: "Internships",
    year: new Date().getFullYear(),  // Pass the year variable
    // Add any other necessary data for rendering the internships view
  });
});



app.get("/home", async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.redirect("/login");
  }

  try {
    // Fetch all internships from the database
    const internships = await Internships.findAll();

    res.render("home", {
      title: "Student Hub",
      year: new Date().getFullYear(),
      user: user,
      isAdmin: user.is_admin || false,
      internships: internships, // Pass the internship data to the view
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Handling the signup form submission
app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      req.flash('error', 'Email already in use');
      return res.redirect('/signup');
    }

    const isAdmin = email === 'chvarun2908@gmail.com';

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      isAdmin,
    });

    req.login(newUser, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }
      res.redirect("/home");
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Login route
app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: "Invalid email or password",
  }),
  (req, res) => {
    const isAdmin = req.user.is_admin;

    if (isAdmin) {
      res.redirect("/home"); // Redirect to internships page for admins
    } else {
      res.redirect("/home");
    }
  }
);

// Internships routes
const internshipRoutes = require('./routes/internships');
app.use('/internships', internshipRoutes);

// const ci = require('./routes/internships');
// app.use('/create-internship', ci);

// Logout route
app.all("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    res.redirect("/");
  });
});

app.post('/create-internship', isAdmin, async (req, res) => {
  try {
    const { title, description, location, start_date, end_date } = req.body;

    // Check if required fields are present in the request body
    if (!title || !description || !location || !start_date || !end_date) {
      return res.status(400).send('Missing required fields');
    }

    // Parse start_date and end_date to store only the date part
    const parsedStartDate = new Date(start_date).toISOString().split('T')[0];
    const parsedEndDate = new Date(end_date).toISOString().split('T')[0];

    // Assuming your Internship model has appropriate validations
    const newInternship = await Internships.create({
      title,
      description,
      location,
      start_date: parsedStartDate,
      end_date: parsedEndDate,
    });
    console.log('====================================');
    console.log('Internship created successfully:');
    console.log('====================================');
    console.log('Internship created successfully:', newInternship);
    req.flash("success", "Internship created successfully!");
    // Redirect to the internships page after creating an internship
    res.redirect('/internships');
  } catch (error) {
    console.error('Error creating internship:', error);

    // Check if the error is due to validation failure
    if (error.name === 'ValidationError') {
      console.log('Validation error:', error.message);
      req.flash("error", "Validation error: " + error.message);
      res.redirect('/internships'); // Redirect to the internships page with an error flash message
    } else {
      console.log('Internal Server Error:', error);
      res.status(500).send('Internal Server Error');
    }
  }
});






// Admin routes
app.use("/admin", adminRoutes);

// Export the app
module.exports = app;

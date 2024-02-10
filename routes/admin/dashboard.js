<!-- views/admin/dashboard.ejs -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %></title>
    <!-- Include any additional styles or scripts needed for the dashboard -->
</head>
<body>

    <header>
        <h1><%= title %></h1>
        <p>Welcome, <%= user.firstName %> <%= user.lastName %>!</p>
    </header>

    <section>
        <!-- Your admin dashboard content goes here -->
        <p>This is the admin dashboard. Customize it based on your needs.</p>
    </section>

    <footer>
        <p>&copy; <%= year %> Admin Dashboard. All rights reserved.</p>
    </footer>

</body>
</html>

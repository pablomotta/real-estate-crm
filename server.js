const express = require("express");
// const connectDB = require('./config/db');
const path = require("path");
var db = require("./models");

const app = express();

// Connect Database
// connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

//Server static assets in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    );
}

const PORT = process.env.PORT || 5000;

db.sequelize.sync().then(function() {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});

var unirest = require("unirest");

var req = unirest(
    "GET",
    "https://realtor.p.rapidapi.com/properties/list-for-rent"
);

var purchaseZipCode = "";

req.query({
    postal_code: purchaseZipCode,
    radius: "10",
    sort: "relevance",
    limit: "5",
    offset: "0"
});

req.headers({
    "x-rapidapi-host": "realtor.p.rapidapi.com",
    "x-rapidapi-key": "b9eb67217dmsh6e4ce185d3763f6p18c433jsn80fee7df2d19"
});

req.end(function(res) {
    if (res.error) throw new Error(res.error);

    console.log(res.body);
});

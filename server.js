import app from "./index.js";

const PORT = process.env.PORT || 3600;
app.listen(PORT, (req, res) => {
    console.log("Server is listening on 3600.");
});

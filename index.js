const express = require("express");

const postsRouter = require("./routers/posts");

const notFound = require("./middlewares/notFound");
const errorsHandler = require("./middlewares/errorsHandler");

const app = express();

const PORT = 3000;

// Handle static assets
app.use(express.static("public"));

// Handle json
app.use(express.json());

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
	// fabio.func();
	res.send("Main route");
});

app.use("/posts", postsRouter);

app.use(errorsHandler);
app.use(notFound);

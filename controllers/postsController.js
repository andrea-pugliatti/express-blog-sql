const postsList = require("../data/posts");
const connection = require("../data/db");

const index = (req, res) => {
	// res.send("Lista dei post");
	// res.json(postsList);

	let filteredList = postsList;

	if (req.query.tag) {
		filteredList = postsList.filter((post) =>
			post.tags
				.map((t) => t.toLowerCase())
				.includes(req.query.tag.toLowerCase()),
		);
	}

	// if (req.query.id) {
	// 	filteredList = postsList.filter((post) => post.id === Number(req.query.id));
	// }

	res.json(filteredList);
};

const show = (req, res) => {
	// res.send(`Visualizzazione post: ${req.params.id}`);
	const found = postsList.find((item) => item.id === Number(req.params.id));

	if (!found) {
		res.status(404).json({ error: true, message: "Not Found!" });
	}

	res.json(found);
};

const store = (req, res) => {
	const newPost = {
		id: Date.now(),
		...req.body,
	};
	postsList.push(newPost);
	console.log(newPost);
	res.status(201).json(newPost);
};

const update = (req, res) => {
	const updated = req.body;
	const found = postsList.find((post) => post.id === Number(req.params.id));

	if (!found) {
		res.status(404).json({ error: true, message: "Not Found!" });
	}

	found.title = updated.title;
	found.image = updated.image;
	found.content = updated.content;
	found.tags = updated.tags;

	console.log(found);

	res.send(`Modifica interamente post: ${req.params.id}`);
};

const modify = (req, res) => {
	const updated = req.body;
	const found = postsList.find((post) => post.id === Number(req.params.id));

	if (!found) {
		res.status(404).json({ error: true, message: "Not Found!" });
	}

	found.title = updated.title || found.title;
	found.image = updated.image || found.image;
	found.content = updated.content || found.content;
	found.tags = updated.tags || found.tags;

	console.log(found);

	res.send(`Modifica parzialemente post: ${req.params.id}`);
};

const destroy = (req, res) => {
	// res.send(`Elimina il post ${req.params.id}`);
	const found = postsList.find((post) => post.id === Number(req.params.id));

	if (!found) {
		res.status(404).json({ error: true, message: "Not Found!" });
	}

	postsList.splice(postsList.indexOf(found), 1);

	console.log(postsList);
	res.sendStatus(204);
};

module.exports = { index, show, store, update, modify, destroy };

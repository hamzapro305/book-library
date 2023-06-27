import { Schema, model } from "mongoose";

let BookSchema = new Schema({
	_id: String,
	title: String,
	author: String,
	yearPublishedAt: String,
	publisher: String,
	imageURL_small: String,
	imageURL_medium: String,
	imageURL_large: String,
});

const Book = model('Book', BookSchema);

export { Book }
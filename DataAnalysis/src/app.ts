import fs from "fs";
import path from "path";
import connectToDatabase from "./connect";
import { Book } from "./model";

type BookT = {
	_id: string;
	title: string;
	author: string;
	yearPublishedAt: string;
	publisher: string;
	imageURL_small: string;
	imageURL_medium: string;
	imageURL_large: string;
};

const uploadBooks = async (Lines: String[]) => {
	if (await connectToDatabase()) {
		let allBooks: any[] = [];
		for (let i = 0; i < Lines.length; i++) {
			const Line = Lines[i];
			let allItems = Line.split(";");
			allItems = allItems.map((x) => x.slice(1, -1));
			const [
				_id,
				title,
				author,
				yearPublishedAt,
				publisher,
				imageURL_small,
				imageURL_medium,
				imageURL_large,
			] = allItems;
			let newBook = new Book({
				_id,
				author,
				imageURL_large,
				imageURL_medium,
				imageURL_small,
				publisher,
				title,
				yearPublishedAt: yearPublishedAt,
			});
			allBooks.push(newBook);
		}
        console.log("Conversion Done")
        console.log("Uploading start")
		try {
			await Book.insertMany(allBooks);
		} catch (error) {
			console.log(error);
		}
        console.log("Uploading done")
	}
};

var jsonPath = path.join(__dirname, "..", "data", "books.csv");

let allLines = fs.readFileSync(jsonPath, { encoding: "utf-8" }).split("\n");
console.log("Data Read Done")

uploadBooks(allLines.slice(1));

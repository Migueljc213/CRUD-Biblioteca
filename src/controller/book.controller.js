import bookServices from "../service/book.services.js";

async function createBookController(req, res) {
  const newBook = req.body;
  const userId = req.userId;
  console.log(newBook);
  try {
    const bookCreated = await bookServices.createBookService(newBook, userId);
    res.status(201).send(bookCreated);
  } catch (e) {
    res.status(400).send(e.message);
  }
}

async function findAllBooksController(req, res) {
  try {
    const books = await bookServices.findAllBooksService();
    res.send({ books });
  } catch (e) {
    res.status(404).send({ message: e.message });
  }
}

async function updateBookController(req, res) {
  const userId = req.userId;
  const bookId = req.params.id;
  const updatedBook = req.body;
  try {
    const response = await bookServices.updateBookService(
      bookId,
      updatedBook,
      userId
    );
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function deleteBookControler(req, res) {
  const bookId = req.params.id;
  const userId = req.userId;

  try {
    const response = await bookServices.deleteBookService(bookId, userId);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function searchBookController(req, res) {
  const { search } = req.query;
  try {
    const books = await bookServices.searchBookService(search);
    res.status(200).send(books);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
export default {
  createBookController,
  findAllBooksController,
  updateBookController,
  deleteBookControler,
  searchBookController,
};

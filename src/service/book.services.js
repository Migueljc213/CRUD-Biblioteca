import bookRepositories from "../repositories/book.repositories.js";

async function createBookService(newBook, userId) {
  const createdBook = await bookRepositories.createBookRespository(
    newBook,
    userId
  );
  if (!createdBook) throw new Error("Error creating book");
  return createdBook;
}

async function findAllBooksService() {
  const books = await bookRepositories.findAllBookRespository();
  return books;
}
async function findByIdBookService(id) {
  const book = await bookRepositories.findByIdBookRespository(id);
  if (!book) throw new Error("Not found book");
  return book;
}

async function updateBookService(bookId, updatedBook, userId) {
  const book = await findByIdBookService(bookId);
  if (!book) throw new Error("book not found");
  if (book.userId !== userId) throw new Error("Unauthorized");
  const response = await bookRepositories.updateBookRespository(
    bookId,
    updatedBook
  );
  return response;
}
async function deleteBookService(bookId, userId) {
  const book = await bookRepositories.findByIdBookRespository(id);
  if (!book) throw new Error("Not found book");
  if (book.id !== userId) throw new Error("Unauthorized");
  const response = bookRepositories.deleteBookRespository(bookId);
  return response;
}

export default {
  createBookService,
  findAllBooksService,
  findByIdBookService,
  deleteBookService,
  updateBookService,
};

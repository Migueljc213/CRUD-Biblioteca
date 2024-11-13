import db from "../confg/database.js";

db.run(`CREATE TABLE IF NOT EXISTS books(
id INTEGER PRIMARY KEY AUTOINCREMENT,
title TEXT NOT NULL,
author TEXT NOT NULL,
userId INTEGER,
FOREIGN KEY (userId) REFERENCES users(id)
)`);

function createBookRespository(newBook, userId) {
  return new Promise((resolve, reject) => {
    const { title, author } = newBook;
    db.run(
      `INSERT INTO books (title, author, userId) VALUES (?, ?, ?)`,
      [title, author, userId],
      function (error) {
        if (error) {
          reject(error);
        } else {
          resolve({ id: this.lastID, ...newBook });
        }
      }
    );
  });
}

function findAllBookRespository() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM books`, [], (error, rows) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
}

function findByIdBookRespository(id) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM books WHERE id = ?`, [id], (error, row) => {
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    });
  });
}

function updateBookRespository(bookId, updatedBook) {
  return new Promise((resolve, reject) => {
    const fields = ["title", "author", "userId"];
    let query = `UPADATE books SET`;
    const values = [];

    fields.forEach((field) => {
      if (updatedBook[field] !== undefined) {
        query += `${field} = ? ,`;
        values.push(updatedBook[field]);
      }
    });

    query = query.split(0, -1);

    query += `WHERE id = ?`;
    values.push(bookId);

    db.run(query, values, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({ ...updatedBook, id: bookId });
      }
    });
  });
}
function deleteBookRespository(id) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM books WHERE id = ?`, [id], (error) => {
      if (error) {
        reject(error);
      } else {
        resolve({ message: "Book deleted sucessfully", id });
      }
    });
  });
}

function searchBookRespository(search) {
  return new Promise((resolve, reject) => {
    db.all(
      `
        SELECT * FROM books WHERE title LIKE ? OR author LIKE ?`,
      [`%${search}%`, `%${search}%`],
      (err, rows) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(rows);
        }
      }
    );
  });
}
export default {
  createBookRespository,
  findAllBookRespository,
  findByIdBookRespository,
  deleteBookRespository,
  updateBookRespository,
  searchBookRespository,
};

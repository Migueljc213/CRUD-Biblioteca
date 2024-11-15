import db from "../confg/database.js";

db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    avatar TEXT
    )
    `
);

function createUserRepository(newUser) {
  return new Promise((res, rej) => {
    const { username, email, password, avatar } = newUser;
    db.run(
      `
            INSERT INTO users (username, email, password,avatar)
            VALUES(?,?,?,?)`,
      [username, email, password, avatar],
      function (err) {
        if (err) {
          rej(err);
        } else {
          res({ ...newUser, id: this.lastId });
        }
      }
    );
  });
}

function findUserByEmailRepository(email) {
  return new Promise((res, rej) => {
    db.get(
      `
            SELECT id, username, email, avatar, password
            FROM users 
            WHERE email = ?
            `,
      [email],
      (err, row) => {
        if (err) {
          rej(err);
        } else {
          res(row);
        }
      }
    );
  });
}

function findUserByIdRepository(id) {
  return new Promise((res, rej) => {
    db.get(
      `
            SELECT id, username, email, avatar, password
            FROM users 
            WHERE id = ?
            `,
      [id],
      (err, row) => {
        if (err) {
          rej(err);
        } else {
          res(row);
        }
      }
    );
  });
}

function findAllUsersRepository() {
  return new Promise((res, rej) => {
    // Corrigido a ordem dos parâmetros e a sintaxe
    db.all("SELECT * FROM users", [], (err, rows) => {
      if (err) {
        rej(err); // Rejeita a Promise em caso de erro
      } else {
        res(rows); // Resolve a Promise com os dados
      }
    });
  });
}
function findUserByIdRespositoy(userId) {
  return new Promise((res, rej) => {
    db.get("SELECT * from users WHERE id = ?", [userId], (err, rows) => {
      if (err) {
        rej(err);
      } else {
        res(rows);
      }
    });
  });
}
function updateUserRepository(newUser, userId) {
  return new Promise((res, rej) => {
    const fields = ["username", "email", "password", "avatar"];
    let query = "UPDATE users SET ";
    const values = [];

    fields.forEach((field) => {
      if (newUser[field] !== undefined) {
        query += `${field} = ?,`;
        values.push(newUser[field]);
      }
    });
    query = query.slice(0, -1);
    query += " WHERE id = ?";
    values.push(userId);

    db.run(query, values, (err) => {
      if (err) {
        rej(err);
      } else {
        res({ ...newUser, userId });
      }
    });
  });
}

function deleteUserRepositoty(userId) {
  return new Promise((res, rej) => {
    db.run(`DELETE FROM users WHERE id = ?`, [userId], (err) => {
      if (err) {
        rej(err);
      } else {
        res({ message: "User deleted sucessfully", userId });
      }
    });
  });
}

export default {
  createUserRepository,
  findUserByEmailRepository,
  findAllUsersRepository,
  updateUserRepository,
  findUserByIdRespositoy,
  deleteUserRepositoty,
  findUserByIdRepository,
};

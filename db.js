// Updated db.js
const db = {
  users: [
    { id: 1, name: "Pratham", role: "user", blocked: false },
    { id: 2, name: "Apoorv", role: "user", blocked: false },
    { id: 3, name: "Adosh", role: "user", blocked: false },
    { id: 4, name: "Shantanu", role: "admin", blocked: false },
    { id: 5, name: "Karan", role: "admin", blocked: false },
  ],
  todos: [
    { id: 1, title: "Go To Gym", flagged: false },
    { id: 2, title: "Buy Groceries", flagged: false },
    { id: 3, title: "Do Laundry", flagged: false },
  ],
};

module.exports = db;

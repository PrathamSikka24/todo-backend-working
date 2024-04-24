// Updated db.js
const db = {
  users: [
    { id: 1, name: "Andrew Smith", role: "user", blocked: false },
    { id: 2, name: "John Doe", role: "user", blocked: false },
    { id: 3, name: "Davis Johnson", role: "user", blocked: true },
    { id: 4, name: "Maria Waters", role: "admin", blocked: false },
    { id: 5, name: "Grace Stones", role: "admin", blocked: false },
  ],
  todos: [
    { id: 1, title: "Go To Gym", flagged: false },
    { id: 2, title: "Buy Groceries", flagged: false },
    { id: 3, title: "Do Laundry", flagged: false }
  ],
};

module.exports = db;

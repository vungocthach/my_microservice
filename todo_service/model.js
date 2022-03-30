const { writeFileSync } = require("fs");
const { saveDB } = require("../user_service/model");
const { DATA_URI } = require("./config");
const db = require('./data/todo.json');

class TodoModel {
    constructor(name, userId) {
        //TODO: set Id = largest id in file + 1
        this.name = name;
        this.userId = userId;
        this.check = false;
    };
    static getAll(){
        return db.todos;
    }
    static getByUserId(userId){
        return db.todos.filter(e => {
            if(e.userId === userId){
                return e;
            }
        })
    }
    static getById(id){
        const rows = db.todos.filter(e => {
            if(e.id === id){
                return e;
            }
        });

        if(rows && rows.length === 1){
            return rows[0];
        }

        return undefined;
    }
    static create(name, userId){
        const newID = db.lastIndex + 1;
        const todo = {
            id: newID,
            name,
            check: false,
            userId
        };
        
        db.todos.push(todo);
        db.lastIndex = todo.id;
        this.saveDB();
    }
    static update(todo){
        if(!this.getById(todo.id)){
            throw ("Not exist todo have id = " + todo.id);
        }
        this.delete(todoId);
        db.todos.push(todo);
        saveDB();
    }
    static delete(id){
        db.todos = db.todos.filter(e => e.id !== id);
        this.saveDB();
    }
    static saveDB(){
        const db_dir = `${__dirname}/${DATA_URI}`;
        writeFileSync(db_dir, JSON.stringify(db, null, 4));
    }
}

module.exports = TodoModel;
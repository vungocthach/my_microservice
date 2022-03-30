const { writeFileSync } = require("fs");
const { DATA_URI } = require("./config");
const db = require('./data/user.json');

class UserModel {
    constructor(username, password, name, gender) {
        //TODO: set Id = largest id in file + 1
        this.username = username;
        this.password = password;
        this.name = name;
        this.gender = gender;
        this.numberTask = 0;
    }

    static getAll(){
        return db.users;
    }

    static findUserById (userID) {
        const users = db.users;
        
        for(let i = 0; i< users.length; i++){
            if(users[i].id === userID){
                return users[i];
            }
        }
    }

    static findUser(username) {
        const users = db.users;
        
        for(let i = 0; i< users.length; i++){
            if(users[i].username === username){
                return users[i];
            }
        }
    }

    static setNumberTask(userId, number) {
        const user = this.findUserById(userId);
        user.numberTodo = number;
        this.saveDB();
    }

    static create(username, password, name, gender) {
        const newID = db.lastIndex + 1;
        const user = {
            id: newID,
            username,
            password,
            name,
            gender,
        }
        db.users.push(user);
        db.lastIndex = user.id;
        this.saveDB();
    }

    static delete(userId){
        db.users = db.users.filter(u => u.id !== userId);
        this.saveDB();
    }

    static saveDB(){
        const db_dir = `${__dirname}/${DATA_URI}`;
        writeFileSync(db_dir, JSON.stringify(db, null, 4));
    }
}

module.exports = UserModel;
class UserModel {
    constructor(username, password, name, gender) {
        //TODO: set Id = largest id in file + 1
        this.username = username;
        this.password = password;
        this.name = name;
        this.gender = gender;
        this.numberTask = 0;
    }
    static findUser(username) {}
    static setNumberTask(userId, number) {}
    static create(username, password, name, gender) {}
    static delete(userId){}
    static getAll(){}
}

module.exports = UserModel;
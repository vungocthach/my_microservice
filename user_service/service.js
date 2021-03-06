const UserModel = require("./model");

//Dealing with data base operations
class UserRepository {
    /**
     * Find user by username
     * @param {string} username
     * @returns user need find
     */
    async FindUser(username) {
        try {
            const user = await UserModel.findUser(username);
            return user;
        } catch (err) {
            throw error;
        }
    }

    /**
     * Change numberTask when tasks change
     * @param {string} userId user need set numberTask
     * @param {number} number can negative or positive, offset of new numberTask
     * @returns new value of numberTask
     */
    async SetNumberTask(userId, number) {
        try {
            await UserModel.setNumberTask(
                userId,
                number
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    async Create({ username, password, name, gender }) {
        try {
            let isSuccess = await UserModel.create(
                username,
                password,
                name,
                gender
            );
            return isSuccess;
        } catch (error) {
            throw error;
        }
    }

    async GetAll() {
        try {
            let users = await UserModel.getAll();
            return users;
        } catch (error) {
            throw error;
        }
    }

    async GetById(id){
        return UserModel.findUserById(id);
    }

    async Delete(userId) {
        try {
            let isSuccess = await UserModel.delete(userId);
            return isSuccess;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserRepository();

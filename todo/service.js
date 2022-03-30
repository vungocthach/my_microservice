const { TodoModel } = require("./model");

//Dealing with data base operations
class TodoRepository {
    /**
     * Get all todo of user by id
     * @param {string} userId
     * @returns list todo
     */
    async GetAll(userId) {
        try {
            const todos = await TodoModel.getAll(userId);
            return todos;
        } catch (err) {
            throw error;
        }
    }

    /**
     * Get all todo of user by id
     * @param {string} userId
     * @returns list todo
     */
    async GetOne(todoId) {
        try {
            const todos = await TodoModel.getOne(todoId);
            return todos;
        } catch (err) {
            throw error;
        }
    }

    /**
     * Update current todo
     * @param {todoObject} todo object of todo
     * @returns boolean is success or not
     */
    async Update(todo) {
        try {
            const isSuccess = await TodoModel.update(todo);
            return isSuccess;
        } catch (error) {
            throw error;
        }
    }

    async Create({ name, userId }) {
        try {
            const isSuccess = await TodoModel.create(name, userId);
            return isSuccess;
        } catch (error) {
            throw error;
        }
    }

    async Delete(todoId) {
        try {
            const isSuccess = await TodoModel.delete(todoId);
            return isSuccess;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TodoRepository;

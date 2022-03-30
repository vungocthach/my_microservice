const TodoModel = require("./model");
const { decreaseTodo, increaseTodo } = require("./api/user");

//Dealing with data base operations
class TodoRepository {
    /**
     * Get all todo of user by id
     * @param {string} userId
     * @returns list todo
     */
    async GetByUserId(userId) {
        try {
            const todos = await TodoModel.getByUserId(userId);
            return todos;
        } catch (err) {
            throw error;
        }
    }

    async GetAll() {
        try {
            const todos = await TodoModel.getAll();
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
            const todos = await TodoModel.getById(todoId);
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
            if(await increaseTodo(userId)){
                await TodoModel.create(name, userId);
                return true;
            }
            
            return undefined;
        } catch (error) {
            // console.log("have error")
            // console.log(error);
            throw error;
        }
    }

    async Delete(todoId) {
        try {
            const todo = await TodoModel.getById(todoId);
            if(todo && await decreaseTodo(todo.userId)){
                await TodoModel.delete(todoId);
                return true;
            }
            
            return false;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new TodoRepository();

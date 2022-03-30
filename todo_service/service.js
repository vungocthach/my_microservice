const {Axios } = require("axios");
const { GATEWAY_URI } = require("./config");
const service = require("./service");
const TodoModel = require("./model");

const axios = new Axios({
    timeout: 3000,
});

async function getUser(userId) {
    const response = await axios.get(`${GATEWAY_URI}/user/findById/?id=${userId}`);
    if (response.status === 200) {
        return response.data.user;
    }

    // Failed
    return undefined;
}

async function increaseTodo(userId) {
    const user = await getUser(userId);
    if(!user){
        return undefined;
    }

    const response = await axios.get(`${GATEWAY_URI}/user/setTodos/?number=${user.numberTodo + 1}`);
    if (response.status === 200) {
        return true;
    }

    // Failed
    return undefined;
}

async function decreaseTodo(userId) {
    const user = await getUser(userId);
    if(!user){
        return undefined;
    }

    const response = await axios.get(`${GATEWAY_URI}/user/setTodos/?number=${user.numberTodo - 1}`);
    if (response.status === 200) {
        return true;
    }

    // Failed
    return undefined;
}

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
            else{
                console.log("failed when call");
            }
            
            return undefined;
        } catch (error) {
            console.log(error);
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
            
            return undefined;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new TodoRepository();

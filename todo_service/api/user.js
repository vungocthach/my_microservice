const {Axios, default: axios } = require("axios");
const { GATEWAY_URI } = require("../config");
async function getUser(userId) {
    const response = await axios.get(`${GATEWAY_URI}/user/findById/${userId}`);
    console.log("response = ");
    //console.log(JSON.stringify(response));
    console.log("end response = ");
    if (response.status === 200) {
        console.log("user = ");
        console.log(response.data);
        return response.data.user;
    }

    // Failed
    return undefined;
}

async function updateTodoCount(userId, todoCount){
    const response = await axios.get(`${GATEWAY_URI}/user/setTodos/${userId}/${todoCount}`);
    if (response.status === 200) {
        console.log(response.data);
        return true;
    }

    // Failed
    return undefined;
}

async function increaseTodo(userId) {
    const user = await getUser(userId);
    if(!user){
        return undefined;
    }

    return updateTodoCount(userId, parseInt(user.numberTodo) + 1);
}

async function decreaseTodo(userId) {
    const user = await getUser(userId);
    if(!user){
        return undefined;
    }

    return updateTodoCount(userId, parseInt(user.numberTodo) - 1);
}

module.exports = {
    getUser,
    increaseTodo,
    decreaseTodo,
}
class TodoModel {
    constructor(name, userId) {
        //TODO: set Id = largest id in file + 1
        this.name = name;
        this.userId = userId;
        this.check = false;
    }
    static getAll(name, userId);
    static getOne(todoId);
    static update(todo);
    static create(name, userId);
    static delete(userId);
}

export default TodoModel;
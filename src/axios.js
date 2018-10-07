import axios from 'axios';

const baseURL = "https://todo-app-with-firebasedb.firebaseio.com";

export const addTodo = (todo) => {
    return new Promise((resolve, reject) => {
    axios.post(`${baseURL}/todos.json`,todo)
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            reject(err);
        })
    })
}

export const getAllTodos = () => {
    return new Promise((resolve, reject) => {
        axios.get(`${baseURL}/todos.json`)
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            reject(err);
        })
    })
}

export const deleteTodo = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${baseURL}/todos/${id}.json`)
            .then(res =>  {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const deleteAllTodos = () => {
    return new Promise((resolve, reject) => {
        axios.delete(`${baseURL}/todos.json`)
            .then(res =>  {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const editTodo = (id,todo) => {
    return new Promise((resolve, reject) => {
        axios.patch(`${baseURL}/todos/${id}.json`,{todo})
            .then(res =>  {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })    
}
import React , {Component} from 'react';
import Todos from '../../components/Todos/Todos';
import Input from '../../components/Input/Input';
import Spinner from '../../components/Spinner/Spinner';
import {addTodo, getAllTodos, deleteTodo, deleteAllTodos, editTodo} from '../../axios';
import './Layout.css';

class Layout extends Component{
    constructor(){
        super();
        this.state = {
            input : '',
            todos : [],
            editing : false,
            loading : false
        }
        this.editingId = null;
    }

    componentDidMount() {
        this.updateTodosList();
    }

    updateTodosList = () => {
        this.setState({loading : true});
        getAllTodos()
            .then(res => {
                let todos = []
                for(let todo in res){
                    todos.push({ id : todo ,todo : res[todo].todo});
                }
                this.setState({todos ,loading : false})
            })
            .catch(err => {
                this.setState({loading : false});
                alert(err);
            })
    }
    
    changeInputHandler = (input) => {
        this.setState({ input });
    } 

    saveTodoHandler = () => {
        const input = this.state.input;
        
        if(input !== ''){
            this.setState({loading : true});

            if(this.editingId === null){
                addTodo({todo : input})
                    .then(res => {
                        this.updateTodosList();
                        this.setState({ input : '' });
                    })
                    .catch(err => {
                        this.setState({loading : false});
                        alert(err);
                    });
            }
            else{
                editTodo(this.editingId, this.state.input)
                    .then(res => {
                        this.updateTodosList();
                        this.setState({ 
                            editing : false,
                            input : '' 
                        });
                        this.editingId = null
                    })
                    .catch(err => {
                        this.setState({loading : false});
                        alert(err)
                    });
            }    
        }
    }    

    deleteTodoHandler = (id) => {
        this.setState({loading : true});
        deleteTodo(id)
            .then(res => {
                if(id === this.editingId){
                    this.editingId = null;
                    this.setState ({
                        input : '',
                        editing : false});
                }
                this.updateTodosList();
            })
            .catch(err => {
                this.setState({loading : false});
                alert(err);
            })
        }

    deleteAllTodosHandler = () => {
        this.setState({loading : true});
        deleteAllTodos()
            .then(res => {
                this.updateTodosList();
                this.setState({ editing : false });
                this.editingId = null
            })
            .catch(err => {
                this.setState({loading : false});
                alert(err);
            })
    }

    editTodoHandler = (id) => {
        const todoObj = this.state.todos.find(todo => {
            return todo.id === id
        });
        this.setState({
            input : todoObj.todo,
            editing : true
        });
        this.editingId = id;
    }
    
    render (){
        let btnValue = "Add";
        let btnClass = "primary";
        if(this.state.editing){
            btnValue = "Update";
            btnClass = "warning";
        }
        btnClass = "btn btn-"+btnClass;
        
        let deleteAllButton = null;
        if(this.state.todos.length > 1){
            deleteAllButton = 
            <Input 
                type= "button" 
                onClick={this.deleteAllTodosHandler} 
                value = "Delete All" 
                className="btn btn-danger"/>
        }

        let todos = null;
        if(this.state.loading)
            todos = <Spinner/>
        else if (this.state.todos.length > 0){
            todos = (
                <Todos
                    todos = {this.state.todos}
                    editTodo = {this.editTodoHandler}
                    deleteTodo = {this.deleteTodoHandler}/>)
        }   
        else
            todos = <p className = "no-todo-msg">No Recent Todos</p>

        return (
            <div className = "main-div">
                <h1 className="display-4 heading">Todo App</h1>
                <Input 
                    type = "text" 
                    value ={this.state.input} 
                    className="form-control input-field"
                    onChange ={(event) => this.changeInputHandler(event.target.value)} />

                <Input 
                    type= "button" 
                    onClick={this.saveTodoHandler} 
                    value = {btnValue} 
                    className={btnClass}/>

                {deleteAllButton}
                
                {todos}
            </div>
        )
    }
}    

export default Layout;
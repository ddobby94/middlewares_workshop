import React from 'react';
import { connect } from 'react-redux';
import { addTask, errorTask } from '../actions';

const AddTask = ({ addTask, addErrorTask }) => {
    let inputText, inputExecutor;

    const submitTask = (e) => {
        e.preventDefault();

        if (!inputText.value.trim()) {
            addErrorTask();
            return;
        }
            
        addTask(
            inputText.value,
            inputExecutor.value.trim() ? inputExecutor.value : 'All'
        );

        inputText.value = '';
        inputExecutor.value = '';
    };

    return (
        <div className="form-container">
            <form onSubmit={submitTask}>
                <input 
                    className="task-form-text"
                    placeholder="New task..."
                    ref={node => inputText = node}
                />
                <input 
                    className="task-form-executor"
                    placeholder="Who..."
                    ref={node => inputExecutor = node}
                />
                <input 
                    className="task-form-submit"
                    type="submit" 
                    value="Add"
                />
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    addTask: (text, executor) => dispatch(addTask({text, executor})),
    addErrorTask: () => dispatch(errorTask()),
});

export default connect(null, mapDispatchToProps)(AddTask);
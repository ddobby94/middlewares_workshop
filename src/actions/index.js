let nextTaskId = 0;

export const addTask = (data) => {
    const { text, executor, status = 'TODO' } = data;
    console.log('DISPATCHING ACTION: ADD_TASK');
    console.log('payload: ', data);
    return {
        type: 'ADD_TASK',
        id: (nextTaskId++).toString(),
        text,
        executor,
        status,
    }
};

export const addAllTasks = (taskList) => {
    taskList.forEach(task => dispatch(addTask(task)));
    return {
        type: 'ADD_TASK_LIST',
    }
}

export const removeTask = (id) => ({
    type: 'REMOVE_TASK',
    id
})

export const changeTaskStatus = (id) => ({
    type: 'CHANGE_TASK_STATUS',
    id
})

export const errorTask = () => ({
    type: 'ERROR_TASK'
})

export const loadMoreStart = () => ({
    type: 'FETCH_START',
})

export const loadMoreSuccess = (responseRawData) => ({
    type: 'FETCH_SUCCESS',
    responseRawData
})

export const sagasLoadMoreSuccess = (todosList) => ({
    type: 'SAGAS_FETCH_SUCCESS',
    todosList
})

export const loadMoreError = (error) => ({
    type: 'FETCH_ERROR',
    error
})

export const loadMore = () => (dispatch) => {
   dispatch(loadMoreStart());
//    callApi().then((response) => {
//        const list = structureResponse(response);

//        if (!list.length) {
//            dispatch(loadMoreError('No tasks!'));
//        } else {
//            dispatch(loadMoreSuccess(response));
//            list.forEach(task => dispatch(addTask(task)));
//        }
//    })
}

export const callApi = () => new Promise((res, rej) => {
    setTimeout(() => {
        fetch('http://rest.learncode.academy/api/dobby0515/todos')
        .then((data) => data.json())
        .then((response) => res(response))
        .catch((e) => rej(e))
    }, 500);
})

export const structureResponse = ([resp]) => {
    let array = [];
    for (let key in resp) {
        if (!isNaN(key)) {
            array.push(resp[key])
        }
    }
    return array;
}
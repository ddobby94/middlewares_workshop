const statuses = ['TODO', 'DOING', 'DONE'];

const task = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                id: action.id,
                text: action.text,
                executor: action.executor,
                status: action.status || 'TODO'
            };   
        case 'REMOVE_TASK':
            if (state.id === action.id) {
                return false;
            }
            return true;
        case 'CHANGE_TASK_STATUS':
            if (state.id !== action.id) {
                return state;
            }

            let statusNum = statuses.indexOf(state.status);
            const nextStatus = 
                statusNum === 2 
                ? statuses[0] 
                : statuses[statusNum + 1];

            return {
                ...state,
                status: nextStatus,
            };
        default:
            return state;
    }
};

const tasks = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TASK':
            const newState = {
                ...state,
                error: null,
                todos: [
                ...state.todos,
                task(undefined, action)
            ]};
            console.log('NEW STATE: ', newState)
            console.log('------------------------')
            return newState;
        case 'REMOVE_TASK':
            return {
                ...state,
                todos: state.todos.filter(t => task(t, action))
            }
        case 'CHANGE_TASK_STATUS':
            return {
                ...state,
                todos: state.todos.map(t => 
                    task(t, action)
                )
            } 
        case 'ERROR_TASK':
            throw new Error('lets try error handling!');
            return state;
        case 'FETCH_START':
            return {
                ...state,
                fetchingData: {
                    fetching: true,
                    error: null,
                }
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                fetchingData: {
                    responseRawData: action.responseRawData,
                    fetching: false,
                }
            };
        case 'FETCH_ERROR':
            return {
                ...state,
                fetchingData: {
                    fetching: false,
                    error: action.error,
                }
            };
        case 'SAGAS_FETCH_SUCCESS':
            return {
                ...state,
                fetchingData: {
                    error: null,
                    fetching: false,
                },
               
                todos: [
                ...state.todos,
                ...action.todosList.map(singleTask => task(undefined, { ...singleTask, type: 'ADD_TASK' })),
            ]};
        default:
            return state;
    }
};

export default tasks;
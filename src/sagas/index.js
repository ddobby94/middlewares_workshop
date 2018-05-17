import { call, put, takeLatest } from 'redux-saga/effects'
import { callApi, structureResponse, sagasLoadMoreSuccess, loadMoreError, addAllTasks } from '../actions';

function* fetchList(action) {
    try {
        const response = yield call(callApi);

        const list = structureResponse(response);

        if (!list.length) {
            yield put(loadMoreError('NO TASKS!'));
        } else {
            yield put(sagasLoadMoreSuccess(list));
        }
   } catch (e) {
        yield put(loadMoreError(e));
   }
}

function* mySaga() {
    yield takeLatest("FETCH_START", fetchList);
}

export default mySaga;

/*
    Generator functions & yield usage examples:


   // return data from iterator
    function * foo(x) {
        while (true) {
            x = x * 2;
            yield x;
        }
    }

    var g = foo(2);
    g.next(); // -> 4
    g.next(); // -> 8
    g.next(); // -> 16



    
    // yield keyword simply helps to pause and resume a function in any time asynchronously.
    // Additionally it helps to return value from a generator function.

    // pause-resume
    function* process() {
        console.log('Start process 1');
        console.log('Pause process2 until call next()');

        yield;

        console.log('Resumed process2');
        console.log('Pause process3 until call next()');

        yield;

        console.log('Resumed process3');
        console.log('End of the process function');
    }

    var genFunc = process();


    genFunc.next();
    genFunc.next();



    


    // Send values
    function *sendStuff() {
        y = yield (0);
        yield y*y;
    }

    var gen = sendStuff();

    console.log(gen.next().value); // prints 0
    console.log(gen.next(2).value); // prints 4

    */
import React from 'react';

export const LoadingOverlay = () => (
    <div className="loader">
        <h1>
            Fetching data...
        </h1>
    </div>
)

export const LoadMoreButton = ({ onClick }) => (
    <input 
        style={{ margin: 20 }}
        className="task-form-submit"
        type="submit" 
        value="Load Initial Data"
        onClick={onClick}
    />
)

export const ErrorButton = ({ onClick }) => (
    <input 
        style={{ margin: 20, backgroundColor: '#f96363', borderColor: '#f96363' }}
        className="task-form-submit"
        type="submit" 
        value="Fire error task"
        onClick={onClick}
    />
)


export const ErrorMessage = ({ error }) => (
    <div style={{}}>
        <h3>{error}</h3>
    </div>
)
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TaskContextProvider } from './context/taskContext.jsx';
import { AuthContextProvider } from './context/authContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <TaskContextProvider>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </TaskContextProvider>
    </React.StrictMode>
    ,
)

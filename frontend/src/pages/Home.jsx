import React, { useState } from 'react'
import Tasks from '../components/Tasks'
import TaskForm from '../components/TaskForm'

export default function Home() {
    // const [tasks, setTasks] = useState([]);
    return (
        <div className='p-5 mx-auto w-[90%] flex gap-10 h-full'>
            <Tasks /*tasks={tasks} setTasks={setTasks}*/ />
            <TaskForm /*tasks={tasks} setTasks={setTasks}*/ />
        </div>
    )
}

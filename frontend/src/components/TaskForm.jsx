import React, { useState } from 'react'
import { useTaskContext } from '../hooks/useTaskContext';
import { useAuthContext } from '../hooks/useAuthContext';

export default function TaskForm() {
    const [priority, setPriority] = useState('high');

    const [title, setTitle] = useState('');

    const [desc, setDesc] = useState('');

    const { dispatch } = useTaskContext();

    const { user } = useAuthContext();

    const submitTask = async (event) => {
        event.preventDefault();

        if (!user) {
            return
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`,
            },
            body: JSON.stringify({
                title,
                priority,
                description: desc,
                completed: false,
            })
        }

        try {
            const res = await fetch("http://localhost:8000/api/workout", options);
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const json = await res.json();
            dispatch({ type: 'CREATE_TASK', payload: json })
            setTitle('');
            setDesc('');
        } catch (e) {
            console.log(`Error updating post : ${e.message}`);
        }

    }

    return (
        <div className='bg-blue-400 border-2 border-black rounded-lg p-4 w-[600px] h-min'>
            <h1 className='text-2xl mb-4 font-semibold'>Add New Task</h1>
            <form className='flex flex-col gap-8' onSubmit={submitTask}>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='title' className='text-xl font-semibold'>Title</label>
                    <input name='title'
                        placeholder='Task Name'
                        className='text-xl p-2 rounded-lg'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required />
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor='desc' className='text-xl font-semibold'>Description</label>
                    <textarea name='desc'
                        placeholder='Description'
                        className='text-xl p-2 rounded-lg'
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        required />
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor='priority' className='text-xl font-semibold'>Priority</label>
                    <select name='priority'
                        placeholder='priority'
                        className='text-xl p-2 rounded-lg'
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        required>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>

                    </select>

                </div>
                <button type="submit"
                    className='text-2xl bg-black text-white rounded-lg p-4 hover:border-2 hover:border-white hover:shadow-md hover:shadow-white'>
                    Add Task
                </button>
            </form>
        </div>
    )
}

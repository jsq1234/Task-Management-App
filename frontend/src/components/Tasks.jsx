import React, { useContext, useEffect, useState } from 'react'
import tickLogo from '../assets/tick.svg';
import { Trash } from 'lucide-react';
import Spinner from './Spinner';
import { useTaskContext } from '../hooks/useTaskContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

function NoTaskCreated() {
    return (
        <main className='text-5xl font-semibold self-center font-serif w-[1200px] text-center'>
            No Tasks Created!
        </main>
    )
}
function LoadingTasks() {
    return (
        <main className='w-2/3 h-[100%] font-serif text-center'><Spinner /></main>
    )
}
export default function Tasks() {
    const [loading, setLoading] = useState(true);
    const { tasks, dispatch } = useTaskContext();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/workout")
                const body = await res.json();
                console.log(body);
                dispatch({ type: 'SET_TASKS', payload: body })
            } catch (e) {
                console.log(`Error : ${e.message}`);
            } finally {
                setLoading(false);
                
            }
        }
        fetchTasks();
    }, [])

    const deleteTask = async (id) => {
        const res = await fetch(`http://localhost:8000/api/workout/${id}`,{
            method: "DELETE"
        });
        const json = await res.json();
        if(!res.ok){
            throw new Error(`Error in fetch (DELETE)`)
        }else{
            console.log(json);
            dispatch({ type: "DELETE_TASK", payload: id })
        }
    }
    return (
        <>
            {
                loading ? <LoadingTasks /> :
                    tasks.length === 0 ?
                        <NoTaskCreated /> :
                        <main className='w-2/3 flex flex-col gap-5 p-5 border-2 border-black rounded-lg'>
                            {tasks.map(({ _id, title, description, completed, priority, createdAt }) => (
                                <div key={_id} className='group relative p-5 rounded-lg border-2 border-blue-800 hover:text-white hover:bg-blue-400 hover:shadow-md hover:shadow-blue-400'>
                                    {completed && <img src={tickLogo} width={24} height={24} alt='tick' className='absolute top-1.5 left-1' />}
                                    <div className='flex gap-4 justify-between items-center'>
                                        <h1 className='flex-1 text-3xl font-semibold'>{title}</h1>
                                        { priority == 'high' && <p className='text-xl text-red-700 font-semibold'>High</p>}
                                        { priority == 'medium' && <p className='text-xl text-yellow-600 font-semibold'>Medium</p>}
                                        { priority == 'low' && <p className='text-xl text-green-400 font-semibold'>Low</p>}
                                        <Trash className='cursor-pointer group-hover:text-black group-hover:bg-white group-hover:rounded-3xl w-[40px] h-[40px] p-2' onClick={() => deleteTask(_id)}/>
                                    </div>
                                    <p className='text-xl mt-2'>{description}</p>
                                    <div className='border border-black mt-2'></div>
                                    <p className='text-right mt-2 font-semibold'>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
                                </div>
                            ))}
                        </main>
            }
        </>
    )

}

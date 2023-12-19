import { useContext } from "react";
import { TaskContext } from "../context/taskContext";

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if(!context) {
        throw Error('useTaskContext must be used inside TaskContextProvider.')
    }
    return context;
}

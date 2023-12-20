import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { redirect, useNavigate } from "react-router-dom";

export const useSignup = () => {
    const [registered, setRegistered] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const signup = async (email, user_name, password) => {

        setLoading(true);

        const res = await fetch("http://localhost:8000/api/user/signup",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, user_name, password })
            })

        const json = await res.json();

        if (!res.ok) {
            setRegistered(json.Error);
        }
        if (res.ok) {

            localStorage.setItem('user', JSON.stringify(json));
            console.log("Added token to localStorage!");
            
            dispatch({ type: 'LOGIN', payload: json })
            setRegistered(false);
            setLoading(false);
            navigate('/');
        }

        setLoading(false);

    }

    return { signup, registered, loading };

}


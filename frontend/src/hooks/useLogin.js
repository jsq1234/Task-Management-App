import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const navigate = useNavigate();

    const login = async (email, password) => {

        setLoading(true);

        const res = await fetch("http://localhost:8000/api/user/login",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            })

        const json = await res.json();

        if (!res.ok) {
            setError(json.Error);
        }

        if (res.ok) {
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({ type: 'LOGIN', payload: json })
            setLoading(false);
            setError("");
            navigate('/');
        }

        setLoading(false);

    }

    return { login, error, loading };

}


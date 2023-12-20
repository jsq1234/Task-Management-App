import { useForm } from 'react-hook-form';
import { AlertTriangle } from 'lucide-react';
import { useSignup } from '../hooks/useSignup';

export default function Signup() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { signup, registered, loading } = useSignup();

    const onSubmit = async (data) => {

        const { email, user_name, password } = data;
        await signup(email, user_name, password);

    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className='text-xl bg-blue-200 shadow-lg w-fit md:w-[600px] shadow-blue-400 p-10 rounded-2xl mx-auto mt-10'>
            <h1 className='text-4xl text-center font-semibold font-serif'>Sign Up</h1>
            <div className='border-2 mb-5 mt-2 border-slate-600'></div>
            <div className='flex flex-col gap-2 mb-10'>
                <label className="ml-2" htmlFor="email">Email</label>
                <input type="email" className='p-4 rounded-xl focus:bg-slate-100' placeholder='email' {...register("email", { required: true })} />
                {errors.email && <span className='text-red-600 font-semibold ml-2 flex -m-6 items-center gap-3 mt-1'><AlertTriangle /> Email is required.</span>}
                {registered && <span className='text-red-600 font-semibold ml-2 -mb-6 flex gap-3 mt-1'><AlertTriangle /> Email already is use. </span>}
            </div>
            <div className='flex flex-col gap-2 mb-10'>
                <label className="ml-2" htmlFor="username">Username</label>
                <input className='p-4 rounded-xl focus:bg-slate-100' placeholder='username' {...register("user_name", { required: true })} />
                {errors.username && <span className='text-red-600 font-semibold ml-2 -mb-6 flex gap-3 mt-1'><AlertTriangle /> Username is required.</span>}
            </div>
            <div className='flex flex-col gap-2 mb-10'>
                <label className="ml-2" htmlFor="password">Password</label>
                <input className='p-4 rounded-xl focus:bg-slate-100' placeholder='password' {...register("password", { required: true })} />
                {errors.password && <span className='text-red-600 font-semibold ml-2 -mb-6 flex gap-3 mt-1'><AlertTriangle /> Password is required.</span>}
            </div>
            <button disabled={loading} className='border-2 border-black w-[100%] p-2 rounded-2xl bg-black text-white font-semibold focus:shadow-md focus:shadow-black hover:shadow-md hover:shadow-black' type="submit">
                { loading ? "Signing Up..." : "Sign Up" }
            </button>

        </form>

    )
}

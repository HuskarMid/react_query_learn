import { useAppDispatch, useAppSelector } from "@/src/shared/redux";
import { loginThunk } from "./login-thunk";
import { authSlice } from "./auth.slice";

const Login = () => {
    const dispatch = useAppDispatch();

    const loginError = useAppSelector(authSlice.selectors.loginError);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const login = formData.get('login')?.toString() ?? '';
        const password = formData.get('password')?.toString() ?? '';

        dispatch(
            loginThunk(login, password)
        );
    }
    return (
        <div className="p-5 border border-slate-500 rounded-lg container mx-auto mt-10">
            <form className="flex flex-col gap-5" action="" onSubmit={handleSubmit}>
                <h1 className="text-bold text-xl">Login</h1>
                <input
                    type="text" 
                    name="login" 
                    placeholder="Login" 
                    className="p-2 border border-slate-500 rounded-lg" 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    className="p-2 border border-slate-500 rounded-lg" 
                />
                {loginError && <p className="text-red-500">{loginError}</p>}
                <button type="submit" className="p-5 rounded bg-teal-500 text-white hover:bg-teal-600 cursor-pointer">Вход</button>
            </form>
        </div>
    )
}

export default Login;
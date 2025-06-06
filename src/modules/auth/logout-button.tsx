import { logoutThunk } from "./logout-thunk";
import { useAppDispatch } from "@/src/shared/redux";

export const LogoutButton = () => {
    const dispatch = useAppDispatch()
    return <button className="bg-red-500 text-white p-2 rounded-md" onClick={() => dispatch(logoutThunk())}>Logout</button>
}


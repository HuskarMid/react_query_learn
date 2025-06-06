"use client"
import TodoList from "@/src/modules/todoList/TodoList";
import { useUser } from "@/src/modules/auth/use-user";
import Login from "@/src/modules/auth/login";
import { LogoutButton } from "@/src/modules/auth/logout-button";

export default function Home() {
  const user = useUser()
  if (user.isLoading) {
    return <div>Loading...</div>
  }
  if (user.data) {
    return <><LogoutButton /><TodoList /></>
  }
  return <Login />
}
import TodoList from "@/src/modules/TodoList/TodoList";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <TodoList />
    </div>
  );
}

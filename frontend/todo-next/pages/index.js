import Layout from "../components/layouts/layout";
import TaskList from "../components/TaskList";

export default function Home() {
  const tasks = [
    {
      summary: "Task 1",
      detail: "Detail task 1",
    },
    {
      summary: "Task 2",
      detail: "Detail task 2",
    },
    {
      summary: "Task 3",
      detail: "Detail task 3",
    },
  ];

  return (
    <Layout>
      <h1>Todo List</h1>
      <TaskList tasks={tasks}></TaskList>
    </Layout>
  );
}

import Layout from "../components/layouts/layout";
import TaskList from "../components/TaskList";

export default function Home({ tasks }) {
  return (
    <Layout>
      <h1>Todo List</h1>
      <TaskList tasks={tasks}></TaskList>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const endpoint = process.env.TODO_API_BASE_URL;
  const tasks = [];

  try {
    const response = await fetch(endpoint + "task");
    tasks = await response.json();
  } catch (e) {
    return {
      props: {
        tasks: [],
      },
    };
  }

  return {
    props: {
      tasks,
    },
    revalidate: 10,
  };
}

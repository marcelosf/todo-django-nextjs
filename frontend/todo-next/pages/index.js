import Layout from "../components/layouts/layout";
import TaskList from "../components/TaskList";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ModalForm from "../components/ModalForm";

export default function Home({ tasks }) {
  return (
    <Layout>
      <Box>
        <Grid container alignItems="center">
          <Grid item md={6}>
            <h1>Todo List</h1>
          </Grid>
          <Grid item md={6}>
            <ModalForm />
          </Grid>
        </Grid>
      </Box>
      <TaskList tasks={tasks}></TaskList>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const endpoint = process.env.TODO_API_BASE_URL;

  try {
    const response = await fetch(endpoint + "task");
    const tasks = await response.json();

    return {
      props: {
        tasks,
      },
      revalidate: 10,
    };
  } catch (e) {
    return {
      props: {
        tasks: [],
      },
    };
  }
}

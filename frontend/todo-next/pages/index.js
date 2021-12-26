import Layout from "../components/layouts/layout";
import TaskList from "../components/TaskList";
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
  const api = process.env.NEXT_PUBLIC_URL + "/api/tasks";

  const response = await fetch(api);
  const tasks = await response.json();

  return {
    props: {
      tasks,
    },
    revalidate: 10,
  };
}

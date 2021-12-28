export default async function handler(request, response) {
  const endpoint = process.env.TODO_API_BASE_URL;

  if (request.method === "GET") {
    try {
      const data = await fetch(endpoint + "task");
      const tasks = await data.json();

      response.status(200).json(tasks);
    } catch (e) {
      response.status(200).json({ tasks: [] });
    }
  }

  if (request.method === "POST") {
    try {
      const body = JSON.stringify(request.body);
      const resp = await fetch(endpoint + "task/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      });

      const task = await resp.json();
      const status = await resp.status;

      response.status(status).json(task);
    } catch (e) {
      response.status(400).json(e);
    }
  }
}

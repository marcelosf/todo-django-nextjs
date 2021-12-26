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
}

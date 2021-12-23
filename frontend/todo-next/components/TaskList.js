import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function formatDate(date, local) {
  const formatted = new Date(date + "T00:00:00");
  return formatted.toLocaleDateString(local);
}

function TaskList({ tasks }) {
  return (
    <div>
      {tasks.map((task, index) => (
        <Accordion key={index} role="accordion">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{task.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{formatDate(task.date, "pt-BR")}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default TaskList;

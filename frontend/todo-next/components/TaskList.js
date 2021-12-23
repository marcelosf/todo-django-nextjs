import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function TaskList({ tasks }) {
  return (
    <div>
      {tasks.map((task, index) => (
        <Accordion key={index} role="accordion">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{task.summary}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{task.detail}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

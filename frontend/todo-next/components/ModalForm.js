import * as React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DatePicker from "@mui/lab/DatePicker";
import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import moment from "moment";
import { modalStyle } from "./styles.js";

export default function ModalForm() {
  const [name, setName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [date, setDate] = React.useState(null);

  function getFormattedDate() {
    const dateObj = new Date(date);
    return moment(dateObj).format("YYYY-MM-DD");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formattedDate = getFormattedDate();
    const data = JSON.stringify({
      name: name,
      date: formattedDate,
      status: open,
    });

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_URL + "/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <Button sx={{ float: "right" }} variant="contained" onClick={handleOpen}>
        Add new task
      </Button>
      <Modal open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <Card sx={modalStyle}>
            <CardHeader title="New Task" />
            <CardContent>
              <Box
                component="form"
                sx={{ "& .MuiTextField-root": { mb: 3, width: "100%" } }}
              >
                <TextField
                  label="Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Date"
                    value={date}
                    onChange={(newDate) => {
                      setDate(newDate);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <FormControlLabel
                  control={<Checkbox value={done} />}
                  label="Done"
                />
              </Box>
            </CardContent>
            <CardActions>
              <Button type="submit">Add</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </CardActions>
          </Card>
        </form>
      </Modal>
    </div>
  );
}

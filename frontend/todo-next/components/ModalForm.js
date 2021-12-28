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
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import { modalStyle } from "./styles.js";

export default function ModalForm() {
  const [name, setName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [nameValidation, validateName] = React.useState(false);
  const [dateValidation, validateDate] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [snackOpen, setSnackOpen] = React.useState({
    message: "",
    open: false,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSnackOpen = (message) =>
    setSnackOpen({
      message: message,
      open: true,
    });

  const handleSnackClose = () =>
    setSnackOpen({
      message: "",
      open: false,
    });

  const getFormattedDate = () => {
    const dateObj = new Date(date);
    return moment(dateObj).format("YYYY-MM-DD");
  };

  const validateForm = (status) => {
    if (status === 400) {
      validateName(true);
      validateDate(true);
      handleSnackOpen("Both name and date fields are mandatory");
    }

    if (status === 201) {
      handleSnackOpen("Task was created successfuly!!");
    }
  };

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

      validateForm(response.status);
    } catch (e) {
      handleSnackOpen(e);
    }
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Button sx={{ float: "right" }} variant="contained" onClick={handleOpen}>
        Add new task
      </Button>

      <Snackbar
        open={snackOpen.open}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        message={snackOpen.message}
        action={action}
      />

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
                  required
                  error={nameValidation}
                  onBlur={(e) => validateName(!(e.target.value.length > 0))}
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
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        error={dateValidation}
                        onBlur={(e) => {
                          validateDate(!(e.target.value.length > 0));
                        }}
                      />
                    )}
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

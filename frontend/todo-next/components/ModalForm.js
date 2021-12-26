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

const modalStyle = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
};

export default function ModalForm() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [date, setDate] = React.useState(null);

  return (
    <div>
      <Button sx={{ float: "right" }} variant="contained" onClick={handleOpen}>
        Add new task
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Card sx={modalStyle}>
          <CardHeader title="New Task" />
          <CardContent>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { mb: 3, width: "100%" } }}
            >
              <TextField label="Name" variant="outlined" />
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
              <FormControlLabel control={<Checkbox />} label="Done" />
            </Box>
          </CardContent>
          <CardActions>
            <Button>Add</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
}

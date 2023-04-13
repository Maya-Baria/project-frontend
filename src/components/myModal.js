import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "20%",
  height: "25%",
  bgcolor: "background.paper",
  //   boxShadow: 24,
  borderRadius: "15px",
  p: 4,
};

export default function BasicModal({ open, setOpen, userData, deleteUser }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(userData);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete User
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete{" "}
            {userData !== undefined ? userData.firstName : "UserData"}?
          </Typography>
          <Stack
            container
            direction="row"
            spacing={5}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              my: 5,
            }}
          >
            <Button onClick={handleClose} variant="outlined" color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                deleteUser(userData._id);
                setOpen(false);
              }}
              variant="contained"
              color="primary"
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

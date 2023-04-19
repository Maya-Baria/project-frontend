import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";


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

export default function FormValidationModal({ open, setOpen }) {

    const handleClose = () => setOpen(false);


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
                        Warning
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Contractor/Seasonal Employee Can’t be Manager/Director/VP
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
                    </Stack>
                </Box>

            </Modal>
        </div>
    );
}
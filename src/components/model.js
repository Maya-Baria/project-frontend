import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

function ChildModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    return (
       <div>
          <Button onClick={handleOpen}>Yes</Button>
          <Button onClick={handleOpen}>no</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ width: 200 }}>
              <h2 id="child-modal-title">Item is Deleted</h2>
             
            </Box>
          </Modal>
        </div>
      );
    }
    export default function NestedModal() {
        const [open, setOpen] = useState(false);
        const handleOpen = () => {
          setOpen(true);
        };
        const handleClose = () => {
          setOpen(false);
        };
      
        return (
          <div>
            <Button onClick={handleOpen}><DeleteIcon color="primary" /></Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box sx={{  width: 400 }}>
                <h2 id="parent-modal-title">Are you sure?</h2>
                
                <ChildModal />
              </Box>
            </Modal>
          </div>
        );
      }
      
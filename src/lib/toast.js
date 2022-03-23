import React, { memo } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const ToastComponent = ({state, closeFunction, text, severity='info', duration=3000}) => {
  return (
    <>
      <Snackbar open={state} autoHideDuration={duration} onClose={closeFunction}>
        <MuiAlert elevation={6} variant="filled" onClose={closeFunction} severity={severity} sx={{ width: '100%' }}>
          {text}
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export const Toast = memo(ToastComponent);
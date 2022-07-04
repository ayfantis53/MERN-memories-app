import { makeStyles } from "@mui/styles";

export default makeStyles ({
    root: {
      '& .MuiTextField-root': {
        margin: '5px',
      },
    },
    paper: {
      padding: '15px',
    },
    form: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    fileInput: {
      width: '97%',
      margin: '10px 0',
    },
    buttonSubmit: {
      marginTop: '10px',
      marginBottom: '10px'
    },
});
import { makeStyles } from "@mui/styles";

export default makeStyles({
  paper: {
    marginTop: '80px',
    display: 'flex',
    marginRight: 'auto',
    marginLeft: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '17px',
  },
  root: {
    '& .MuiTextField-root': {
      margin: '10px',
    },
  },
  avatar: {
    margin: '10px',
    backgroundColor: '#9c27b0'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '20px',

  },
  googleButton: {
    marginBottom: '20px',
  },
});
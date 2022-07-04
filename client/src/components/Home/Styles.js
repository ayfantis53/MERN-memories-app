import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
          margin: '5px',
        },
      },
    appBarSearch: {
        borderRadius: 4,
        marginBottom: '1rem',
        display: 'flex',
        padding: '15px',
    },
    pagination: {
        borderRadius: 4,
        marginTop: '1rem',
        padding: '16px',
    },
    gridContainer: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column-reverse',
        },
    },
}));


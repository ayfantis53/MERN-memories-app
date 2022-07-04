import { Chip } from "@mui/material";
import { useDispatch } from 'react-redux';
import { useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Autocomplete } from '@mui/material';

import Form from '../Form/Form';
import useStyles from './Styles';
import Posts from '../Posts/Posts';
import Paginate from '../Paginate';
import { getPostsBySearch } from '../../actions/posts';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Home() {

    const query = useQuery();
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const [tags, setTags] = useState([]);
    const [search, setSearch] = useState('');
    const searchQuery = query.get('searchQuery');
    const [currentId, setCurrentId] = useState('');

    const handleKeyPress = (e) => {
        // Handle pressing enter on search bar
        if (e.keyCode === 13){
            searchPost();
        }
    }   

    const searchPost = () => {
        if(search.trim() || tags){
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${search || 'none' }&tags=${tags.join(',')}`);
        }
        else{
            navigate('/');
        }
    }  

    return (
        <Grow in>
            <Container maxWidth='xl' >
                <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer} direction={{sm:'column-reverse', md:'row'}}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={`${classes.root} ${classes.appBarSearch}`} position='static' color='inherit'>
                            <TextField 
                                name='search' 
                                variant="outlined" 
                                label='Search Memories' 
                                fullWidth value={search} 
                                onChange={ (e)=>{ setSearch(e.target.value) } }
                                onKeyPress={ handleKeyPress }
                            />
     
                            <Autocomplete multiple id="tags-standard" freeSolo
                                onChange={(e, newValue) => setTags(newValue)}
                                options={tags.map((tag) => tag)}
                                getOptionLabel={tag => tag}
                                value={tags}
                                renderTags={(value, getTagProps) => value.map((tag, index) =>(<Chip variant="outlined" label={tag} {...getTagProps({ index })} /> ))}
                                renderInput={params => (<TextField {...params} variant="outlined" label="Search Tags" />)}
                            /> 

                            <Button onClick={searchPost} className={classes.searchButton} color='primary' variant='contained'>Search</Button>          
                        </AppBar>

                        <Form currentId={currentId} setCurrentId={setCurrentId}/>

                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Paginate  page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home
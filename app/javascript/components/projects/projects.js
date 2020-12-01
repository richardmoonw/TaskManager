import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import { Button, Grid, Container, Typography } from '@material-ui/core';
import axios from 'axios'
import { Link } from 'react-router-dom'
import NewProjectDialog from './NewProjectDialog'
import EditProjectDialog from './EditProjectDialog'

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    cardGrid: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    newProject:{
        marginRight: '14px',
        marginTop: '14px'
    }
}));



function Projects() {
    const classes = useStyles();
    const [projects, setProjects] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [openNew, setOpenNew] = useState(false)
    const [flag, setFlag] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [project, setProject] = useState({})

    useEffect(() => {
        const url = '/api/v1/projects/'
        axios.get(url)
            .then(function (response) {
                var temp = response.data
                temp.sort(function(a, b) {
                    var textA = a.name.toUpperCase();
                    var textB = b.name.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                })
                setProjects(temp)
                setLoaded(true)
            })
            .catch(resp => console.log(resp))
    }, [flag])
    const editPressed = (proj_id) => {
        setProject(projects.filter(x => x.id === proj_id)[0])
        setOpenEdit(true)
    }

    return (
        <Fragment>
            <NewProjectDialog
                open={openNew}
                setOpen={setOpenNew}
                flag={flag}
                setFlag={setFlag}
            />
            <EditProjectDialog
                open={openEdit}
                setOpen={setOpenEdit}
                flag={flag}
                setFlag={setFlag}
                project={project}
            />
            
            
            <Grid container direction='row' justify='flex-end'>
                <Button className={classes.newProject}variant='contained' color='primary' onClick={() => setOpenNew(true)}>
                    New Project
            </Button>
            </Grid>
            {
                loaded &&
            <Container className={classes.cardGrid} maxWidth="md">

                <Grid container spacing={4}>
                    {projects.map((project) => (
                        <Grid item key={project.id} xs={12} sm={6} md={4}>
                            
                            <Card className={classes.card}>
                                <Link to={{
                                    pathname: `/ticketsboard/${project.id}`,
                                    state: {
                                        project_id: project.id
                                    }
                                }}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://source.unsplash.com/random"
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {project.name}
                                        </Typography>
                                        <Typography>
                                            {project.description}
                                        </Typography>
                                    </CardContent>
                                </Link>
                                <CardActions>
                                    <Button size="small" color="primary"onClick={()=>editPressed(project.id)}>
                                        Edit
                                    </Button>
                                </CardActions>
                            </Card>
                            
                        </Grid>
                    ))}
                </Grid>
            </Container>
            }
        </Fragment>
    );
}

export default Projects;

import React, { useState, useEffect } from 'react';
import { Card, CardActions, CardContent, CardMedia, 
    CardActionArea, Button, Grid, Container, Typography,
    IconButton } from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import NewProjectDialog from './NewProjectDialog'
import EditProjectDialog from './EditProjectDialog'

// Styled Components
const PersonalizedCardMedia = styled(CardMedia)({
    height: '15rem'
});

const PersonalizedCardContent = styled(CardContent)({
    flexGrow: 1
});

const ButtonContainer = styled(Grid)({
    textAlign: "center",
    marginTop: "2rem"
});

const FormattedLink = styled(Link)({
    textDecoration: 'none',
    color: "black"
});

const ProfileContainer = styled(Grid)({
	backgroundColor: "white",
	borderRadius: "0.5rem",
	padding: "2rem 0rem 2rem 2rem",
	margin: "2rem 0rem 2rem 0rem"
});

const ContainerTitle = styled(Typography)({
	fontSize: '1.75rem',
	fontFamily: 'Verdana'
});

const ContainerText = styled(Typography)({
	fontSize: '1.05rem',
	fontFamily: 'Arial',
	lineHeight: '1.5rem',
	marginTop: '1.2rem'
});

function Projects() {
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

    // Function used to delete a selected project
    const deletePressed = (project_id) => {
        axios.delete(`/api/v1/projects/${project_id}`)
            .then(function (response) {
                setFlag(!flag)
            })
            .catch(resp => console.log(resp))
    }

    return (
        <>
            {/* Component to create a new project */}
            <NewProjectDialog
                open={openNew}
                setOpen={setOpenNew}
                flag={flag}
                setFlag={setFlag}
            />

            {/* Component to edit a project */}
            <EditProjectDialog
                open={openEdit}
                setOpen={setOpenEdit}
                flag={flag}
                setFlag={setFlag}
                project={project}
            />
            

            <Container>
                <Grid container>
                    <Grid item xs={11}>
                        <ProfileContainer item xs={12}>
                            <ContainerTitle>Did you know?</ContainerTitle>
                            <Grid item xs={9}>
                                <ContainerText>The beauty of projects is that in addition to producing specific, 
                                        unique, tangible, or intangible results, they are often a catalyst for 
                                        change—a way of inserting new processes, procedures, tools, resources, 
                                        and so on into organizations’ ongoing operations, thereby enabling future 
                                        successes. </ContainerText>
                            </Grid>
                        </ProfileContainer>
                    </Grid>
                    <ButtonContainer item xs={1}>
                        <IconButton onClick={() => setOpenNew(true)}>
                            <AddIcon fontSize="large"/>
                        </IconButton>
                    </ButtonContainer>
                </Grid>

                {
                    loaded &&
                        <Grid container spacing={4}>

                            {/* For each retrieved project, render a card with its 
                            information */}
                            {projects.map((project) => (
                                <Grid item key={project.id} xs={12} sm={6} md={4}>
                                    <Card>
                                        <CardActionArea>
                                            <FormattedLink to={{
                                                pathname: `/ticketsboard/${project.id}`,
                                                state: {
                                                    project_id: project.id
                                                }
                                            }}>
                                                <PersonalizedCardMedia
                                                    image="https://source.unsplash.com/random"
                                                    title={project.name}
                                                />
                                                <PersonalizedCardContent>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        {project.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        {project.description}
                                                    </Typography>
                                                </PersonalizedCardContent>
                                            </FormattedLink>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button 
                                                size="small" 
                                                color="primary"
                                                onClick={()=>editPressed(project.id)}
                                            >Edit</Button>
                                            <Button 
                                                size="small" 
                                                color="primary"
                                                onClick={()=>deletePressed(project.id)}
                                            >Delete</Button>
                                        </CardActions>
                                    </Card>  
                                </Grid>
                            ))}
                        </Grid>

                        
                }
            </Container>
        </>
    );
}

export default Projects;

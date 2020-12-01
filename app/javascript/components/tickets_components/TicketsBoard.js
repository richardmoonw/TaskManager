import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { Grid, Typography, IconButton } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Column from './Column';
import FormDialog from '../tickets_components/FormDialog';
import Navbar from '../Navbar';
import axios from 'axios';

// Styled components
const BackgroundContainer = styled(Grid)({
	backgroundColor: '#f5f5f5',
	minHeight: "100vh",
	height: "100%",
	padding: "2rem 0 2rem 0"
});

const ButtonContainer = styled(Grid)({
    textAlign: "center"
});

const null_employee = [
    {
      "id":0,
      "name": "not assigned"
    }
  ]

// Function used to render the TicketsBoard component.
function TicketsBoard({ handleLogout, match, employee}) {
    const [open, setOpen] = useState(false);
    const [project, setProject] = useState([]);
    const history = useHistory();
    const [loaded, setLoaded] = useState(false);
    const project_id = match.params.id
    const [backlogTickets, setBacklogTickets] = useState([])
    const [devTickets, setDevTickets] = useState([])
    const [progressTickets, setProgressTickets] = useState([])
    const [doneTickets, setDoneTickets] = useState([])
    const [employees, setEmployees] =useState([])
    const [flag, setFlag] = useState(false)

    // Function used to retrieve all the project information before 
    // loading the component.
    useEffect(() => {
        setTimeout(() => {
            const url = `/api/v1/projects/${project_id}`
            axios.get(url)
            .then(function (response) {
                setProject(response.data)
                setEmployees(null_employee.concat(response.data.employees))
                setLoaded(true)
                setBacklogTickets(response.data.tickets.filter(ticket => ticket.status === 'Backlog'))
                setDevTickets(response.data.tickets.filter(ticket => ticket.status === 'Selected for development'))
                setProgressTickets(response.data.tickets.filter(ticket => ticket.status === 'In progress'))
                setDoneTickets(response.data.tickets.filter(ticket => ticket.status === 'Done'))
                
            })
            .catch(resp => console.log(resp))
        }, 100)
    }, [flag])

    // Function used to handle the logout of the application.
    const logout = () => {
		axios
            .delete(`/api/v1/logout`, { withCredentials: true })
            .then(response => {
                handleLogout();
                history.push("/");
            })
            .catch(error => {
                console.log("logout error", error);
            })   
	}

    return (
        <>
            <Navbar handleLogout={logout}/>
            <BackgroundContainer container>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    {/* Top menu */}
                    <Grid container>
                        {
                            loaded &&
                            <Grid item xs={11}>
                                <Typography variant="h3" >
                                {project.name}        
                                </Typography>
                            </Grid>
                        }
                        <ButtonContainer item xs={1}>
                            <IconButton onClick={() => setOpen(true)}>
                                <AddIcon fontSize="large"/>
                            </IconButton>
                        </ButtonContainer>
                    </Grid>

                    {/* Columns */}
                    {loaded &&
                        <Grid container>

                            {/* Backlog column */}
                            <Column 
                                col_title='Backlog'
                                color="#969696"
                                tickets={backlogTickets}  
                                employees={employees}
                                project_id={project_id}
                                flag ={flag}
                                setFlag={setFlag}
                                employee_id={employee}
                            ></Column>

                            {/* Dev column */}
                            <Column 
                                col_title='Selected for development' 
                                color="#8c8eff"
                                tickets={devTickets} 
                                employees={employees} 
                                project_id={project_id}
                                flag ={flag}
                                setFlag={setFlag}
                                employee_id={employee}
                            ></Column>

                            {/* In progress column */}
                            <Column 
                                col_title='In progress' 
                                color="#ff8c90"
                                tickets={progressTickets} 
                                employees={employees}
                                project_id={project_id}
                                flag ={flag}
                                setFlag={setFlag}
                                employee_id={employee}
                            ></Column>

                            {/* Done column */}
                            <Column 
                                col_title='Done' 
                                color="#63db81"
                                tickets={doneTickets} 
                                employees={employees}
                                project_id={project_id}
                                flag ={flag}
                                setFlag={setFlag}
                                employee_id={employee}
                            ></Column>
                        </Grid>
                    }
                </Grid>
            </BackgroundContainer>
            

            <FormDialog
                open={open}
                setOpen={setOpen}
                employees ={employees}
                project_id = {project_id}
                flag ={flag}
                setFlag={setFlag}
            ></FormDialog>
        </>
    );
}

export default TicketsBoard;
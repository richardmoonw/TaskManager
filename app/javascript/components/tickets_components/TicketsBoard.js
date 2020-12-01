import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Column from '../tickets_components/Column'
import { makeStyles } from '@material-ui/core/styles';
import FormDialog from '../tickets_components/FormDialog'
import Navbar from '../Navbar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
const useStyles = makeStyles(() => ({

    button_pad: {
        paddingRight: '30px'
    },
    top_bar: {
        marginTop: '20px',
        marginBottom: '5px'
    }

}));
const null_employee = [
    {
      "id":0,
      "name": "not assigned"
    }
  ]


function TicketsBoard({ handleLogout, match, employee}) {
    const classes = useStyles();
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

        <Fragment>
            <Navbar handleLogout={logout}/>

            <Grid container className={classes.top_bar} direction='row' alignItems='center'>
                <Grid container item md={6} xs={12} justify='center' direction='row'>
                    {
                        loaded &&
                        <Grid item>
                             <Typography variant="h3" >
                             {project.name}        
                             </Typography>
                        </Grid>
                    }

                </Grid>
                <Grid container item md={6} xs={12} direction='row' justify='flex-end'>
                    <Grid item className={classes.button_pad}>
                        <Button variant='contained' color='primary' onClick={() => setOpen(true)}>
                            New ticket
                        </Button>
                    </Grid>
                </Grid>

            </Grid>


            {loaded &&
                <Grid container direction='row' justify="center" >
                    <Column 
                        col_title='Backlog' 
                        tickets={backlogTickets}  
                        employees={employees}
                        project_id={project_id}
                        flag ={flag}
                        setFlag={setFlag}
                        employee_id={employee}
                    ></Column>
                    <Column 
                        col_title='Selected for development' 
                        tickets={devTickets} 
                        employees={employees} 
                        project_id={project_id}
                        flag ={flag}
                        setFlag={setFlag}
                        employee_id={employee}
                    ></Column>
                    <Column 
                        col_title='In progress' 
                        tickets={progressTickets} 
                        employees={employees}
                        project_id={project_id}
                        flag ={flag}
                        setFlag={setFlag}
                        employee_id={employee}
                    ></Column>
                    <Column 
                        col_title='Done' 
                        tickets={doneTickets} 
                        employees={employees}
                        project_id={project_id}
                        flag ={flag}
                        setFlag={setFlag}
                        employee_id={employee}
                    ></Column>
                </Grid>
            }

            <FormDialog
                open={open}
                setOpen={setOpen}
                employees ={employees}
                project_id = {project_id}
                flag ={flag}
                setFlag={setFlag}
            >

            </FormDialog>
        </Fragment>
    );
}

export default TicketsBoard;
import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { Dialog, DialogContent } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import axios from 'axios'
const useStyles = makeStyles({
    name: {
        width: '98%',
        marginBottom: '14px'
    },
    save: {
        marginBottom: '14px'
    },
    buttons:{
        marginBottom:'20px'
    }

});

export default function NewProjectDialog(props) {
    const classes = useStyles();
    const { open, setOpen } = props;
    const [loaded, setLoaded] = useState(false)
    const [employees, setEmployees] = useState([])
    const [projName, setProjName] = useState(props.project.name)
    const [state, setState] = useState({})
    const [projDescription, setProjDescription] = useState(props.project.description)
    
    var employeesIn = []
    
    useEffect(() => {
        const url = '/api/v1/employees'
        if(open){
            setProjDescription(props.project.description)
            setProjName(props.project.name)
            axios.get(url)
                .then(function (response) {
                    var temp = (response.data)
                    const urlProject = `/api/v1/projects/${props.project.id}`

                    axios.get(urlProject)
                    .then(function (response){
                        employeesIn = response.data.employees
                        var variables = {
                        
                        };
                        
                        temp.map(employee => {
                            return (
                                variables[`${employee.id}`] = false
                            )
                        });
                        employeesIn.map(employee => {
                            return (
                                variables[`${employee.id}`] = true
                            )
                        })
                        setState(variables)
                        
                        temp.sort(function(a, b) {
                            var textA = a.name.toUpperCase();
                            var textB = b.name.toUpperCase();
                            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                        })
                        setEmployees(temp);
                        // console.log(employees)
                        setLoaded(true)
                    })
                    .catch(resp =>console.log(resp))
                    
                })
                .catch(resp => console.log(resp))
            }

    }, [open])
    const close = () => {
        setOpen(false)
    }
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const save = () => {
        var ids = []
        Object.entries(state).map(item => {
            // console.log(item[1])
            if (item[1]) {
                // console.log(item[0])
                ids.push(item[0])
            }
        })
        //   console.log(ids)
        if (ids.length < 1 || projName === ''|| projDescription === '') {
            return;
        }
        const update_data = {
            name: projName,
            employee_ids: ids,
            description: projDescription
            
        }
        
        axios.put(`/api/v1/projects/${props.project.id}`, update_data)
            .then(function (response) {
                close()
                props.setFlag(!props.flag)

            })
            .catch(resp => console.log(resp))
    }
    const deletePressed = () =>{
        axios.delete(`/api/v1/projects/${props.project.id}`)
            .then(function (response) {
                close()
                props.setFlag(!props.flag)

            })
            .catch(resp => console.log(resp))
    }
    return (
        <>
            {
                loaded &&

                <Dialog open={open} maxWidth='md' fullWidth={true} >
                    <DialogContent >
                        <Grid container justify='flex-end' >
                            <Button onClick={close}>
                                X
                            </Button>
                        </Grid>
                        <Grid className={classes.buttons} container direction = 'row'spacing={2} alignItems='center'>
                        <Grid item>
                        <Button variant='contained' color='primary' onClick={save} >
                            Save
                        </Button>
                        </Grid>
                        <Grid item>
                        <Button variant='contained' color='secondary' onClick={() => deletePressed()}>
                                Delete
                            </Button>
                        </Grid>
                        
                        
                        </Grid>
                        
                        <TextField
                            className={classes.name}
                            id="Project Name"
                            label="Project Name"
                            variant="outlined"
                            inputProps={{ maxLength: 120 }}
                            multiline
                            rowsMax={2}
                            value={projName}
                            onChange={(e) => setProjName(e.target.value)}
                        />
                        <TextField
                            className={classes.name}
                            id="Project Description"
                            label="Project Description"
                            variant="outlined"
                            inputProps={{ maxLength: 120 }}
                            multiline
                            rowsMax={2}
                            value={projDescription}
                            onChange={(e) => setProjDescription(e.target.value)}
                        />
                        <FormGroup row>
                            {employees.map(employee => {
                                return (
                                    <FormControlLabel
                                        control={<Checkbox checked={state[`${employee.id}`]} onChange={handleChange} name={`${employee.id}`} />}
                                        label={employee.name}
                                        key={employee.id}
                                    />
                                )
                            })}

                        </FormGroup>
                        
                    </DialogContent>
                </Dialog>
            }

        </>
    )
}
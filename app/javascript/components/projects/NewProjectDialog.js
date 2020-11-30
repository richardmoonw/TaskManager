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
    }

});

export default function NewProjectDialog(props) {
    const classes = useStyles();
    const { open, setOpen } = props;
    const [loaded, setLoaded] = useState(false)
    const [employees, setEmployees] = useState([])
    const [projName, setProjName] = useState('')
    const [projDescription, setProjDescription] = useState('')
    const [state, setState] = useState({})
    useEffect(() => {
        const url = '/api/v1/employees'
        if (open) {
            axios.get(url)
                .then(function (response) {
                    setEmployees(response.data)
                    const emps= response.data
                    var variables = {
                        
                    };
                    // console.log(employees)
                    emps.map(employee => {
                        return (
                            variables[`${employee.id}`] = false
                        )
                    })
                    setState(variables)
                    // console.log(variables)
                    setLoaded(true)
                })
                .catch(resp => console.log(resp))
        }

    }, [open])
    const close = () => {
        setOpen(false)
        setProjName('')
        setProjDescription('')
    }
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
      const save = () =>{
          var ids = []
        Object.entries(state).map(item => {
            // console.log(item[1])
            if(item[1]){
                // console.log(item[0])
                ids.push(item[0])
            }
          })
        //   console.log(ids)
          if(ids.length<1 || projName === ''|| projDescription === ''){
              return;
          }
          console.log(projDescription)
          const new_data = {
            name: projName,
            description: projDescription,
            employee_ids: ids
        }
        close()
        axios.post('/api/v1/projects',new_data)
        .then(function(response) {
            // console.log(response)
            props.setFlag(!props.flag)
            
        })
        .catch(resp=> console.log(resp))
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
                        <Button className={classes.save} variant='contained' color='primary'onClick={save} >
                            Save
                        </Button>
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
                        {/* {
                loaded &&
                employees.map(employee => {
                    return (
                        <div key={employee.id}>
                            
                                {employee.name}
                            
                        </div>
                    )
                })
            } */}
                    </DialogContent>
                </Dialog>
            }

        </>
    )
}
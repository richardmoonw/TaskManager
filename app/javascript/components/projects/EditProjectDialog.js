import React, { useEffect, useState } from 'react';
import { Grid, Dialog, DialogContent, Button, TextField,
    FormGroup, FormControlLabel, Checkbox, DialogTitle,
    Typography, IconButton } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { styled } from '@material-ui/core/styles';
import axios from 'axios'

// Styled Components
const FormattedTextField = styled(TextField)({
    width: '100%',
    marginBottom: '1rem'
});

const TitleContainer = styled(DialogTitle)({
    textAlign: "center",
    padding: "1.5rem 0 1.5rem 0",
    borderBottom: "0.1rem solid lightgray"
});

const TitleIcon = styled(EditOutlinedIcon)({
    color: "#607afc"
});

const Title = styled(Typography)({
    fontSize: "2rem",
    fontFamily: "Arial",
    color: "#607afc"
});

const ButtonContainer = styled(Grid)({
    textAlign: "center"
});

const FormattedDialogContent = styled(DialogContent)({
    backgroundColor: "#f9f9f9"
});

const SidePanel = styled(Grid)({
    paddingRight: "1rem",
    boxSizing: "border-box"
})

const InfoText = styled(Typography)({
    margin: "1.2rem 0 1rem 0",
    fontSize: "1rem",
    fontWeight: "bold"
});

const OptionButton = styled(Button)({
    margin: "1rem 0 2rem 0",
    width: "90%",
    heigth: "1.5rem"
});

const FormattedFormGroup = styled(FormGroup)({
    width: "100%"
});

export default function NewProjectDialog(props) {
    const { open, setOpen } = props;
    const [loaded, setLoaded] = useState(false)
    const [employees, setEmployees] = useState([])
    const [projName, setProjName] = useState(props.project.name)
    const [state, setState] = useState({})
    const [projDescription, setProjDescription] = useState(props.project.description)
    
    var employeesIn = []
    
    // Function used to retrieve the employees of a specific project.
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
                        var variables = { }
                        
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
                        setLoaded(true);
                    })
                    .catch(resp =>console.log(resp))
                })
                .catch(resp => console.log(resp))
            }

    }, [open])
    const close = () => {
        setOpen(false)
    }

    // Function used to handle the changes in any of the TextFields.
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    // Function used to update the project in the backend.
    const save = () => {
        var ids = []
        Object.entries(state).map(item => {
            if (item[1]) {
                ids.push(item[0])
            }
        })
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
    
    return (
        <>
            {
                loaded &&
                <Dialog open={open} onClose={close} maxWidth='md' fullWidth={true}>
                    {/* Dialog Header */}
                    <TitleContainer>
                        <Grid container>
                            <Grid item xs={11}></Grid>
                            <ButtonContainer>
                                <IconButton onClick={close}>
                                    <CloseIcon />
                                </IconButton>
                            </ButtonContainer>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <TitleIcon fontSize="large" />
                            </Grid>
                            <Grid item xs={12}>
                                <Title>Edit Incredible Project</Title>     
                            </Grid>
                        </Grid>
                    </TitleContainer>
                    <FormattedDialogContent>
                        <Grid container>
                            {/* Project General Information */}
                            <SidePanel item xs={6}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <InfoText>Project information:</InfoText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormattedTextField
                                            id="Project Name"
                                            label="Type the project name"
                                            variant="outlined"
                                            inputProps={{ maxLength: 120 }}
                                            value={projName}
                                            onChange={(e) => setProjName(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormattedTextField
                                            id="Project Description"
                                            label="Type the project description"
                                            variant="outlined"
                                            inputProps={{ maxLength: 120 }}
                                            multiline
                                            rows={2}
                                            value={projDescription}
                                            onChange={(e) => setProjDescription(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </SidePanel>
                            <Grid item xs={6}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <InfoText>Update members (at least 2 are required [including you]):</InfoText>
                                    </Grid>
                                    <FormattedFormGroup>
                                        <Grid container>
                                            {employees.map(employee => {
                                                return (
                                                    <Grid item xs={6}>
                                                        <FormControlLabel
                                                            control={<Checkbox checked={state[`${employee.id}`]} onChange={handleChange} name={`${employee.id}`} />}
                                                            label={employee.name}
                                                            key={employee.id}
                                                        />
                                                    </Grid> 
                                                )
                                            })}   
                                        </Grid>
                                    </FormattedFormGroup>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={2}></Grid>
                            <ButtonContainer item xs={4}>
                                <OptionButton variant='contained' color='primary' onClick={save}>
                                    Update Project
                                </OptionButton>
                            </ButtonContainer>
                            <ButtonContainer item xs={4}>
                                <OptionButton variant='contained' onClick={close}>
                                    Maybe later
                                </OptionButton>
                            </ButtonContainer>
                        </Grid>
                    </FormattedDialogContent>
                </Dialog>
            }

        </>
    )
}
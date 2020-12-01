import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, TextField, FormGroup, 
    FormControlLabel, Checkbox, Grid, Typography, IconButton } from '@material-ui/core';
import axios from 'axios'; 
import CloseIcon from '@material-ui/icons/Close';
import CreateNewFolderOutlinedIcon from '@material-ui/icons/CreateNewFolderOutlined';
import { styled } from '@material-ui/core/styles';

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

const TitleIcon = styled(CreateNewFolderOutlinedIcon)({
    color: "#fc7272"
});

const Title = styled(Typography)({
    fontSize: "2rem",
    fontFamily: "Arial",
    color: "#fc7272"
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

export default function NewProjectDialog(props) {
    const { open, setOpen } = props;
    const [loaded, setLoaded] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [projName, setProjName] = useState('');
    const [projDescription, setProjDescription] = useState('');
    const [state, setState] = useState({});

    // Fetch all the employees
    useEffect(() => {
        const url = '/api/v1/employees'
        if (open) {
            axios.get(url)
                .then(function (response) {
                    setEmployees(response.data)
                    const emps= response.data
                    var variables = { }
                    emps.map(employee => {
                        return (
                            variables[`${employee.id}`] = false
                        )
                    })
                    setState(variables)
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

    // Function used to handle the changes in any of the TextFields.
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const save = () =>{
        var ids = []
        Object.entries(state).map(item => {
            if(item[1]){
                ids.push(item[0])
            }
        })
        if(ids.length<1 || projName === ''|| projDescription === ''){
            return;
        }
        const new_data = {
            name: projName,
            description: projDescription,
            employee_ids: ids
        }
        close()
        axios.post('/api/v1/projects',new_data)
        .then(function(response) {
            props.setFlag(!props.flag)
            
        })
        .catch(resp=> console.log(resp))
    }
    return (
        <>
            {
                loaded &&
                <Dialog open={open} onClose={close} maxWidth='md' fullWidth={true} >
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
                                <Title>Create Fantastic Project</Title>     
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
                                        <InfoText>Add members (at least 1 is required):</InfoText>
                                    </Grid>
                                    <FormGroup style={{width: "100%"}}>
                                        <Grid container>
                                            {employees.map(employee => {
                                                return (
                                                    <Grid item xs={6}>
                                                        <FormControlLabel
                                                            control={<Checkbox 
                                                            checked={state[`${employee.id}`]} 
                                                            onChange={handleChange} 
                                                            name={`${employee.id}`} />}
                                                            label={employee.name}
                                                            key={employee.id}
                                                        />
                                                    </Grid> 
                                                )
                                            })}   
                                        </Grid>
                                    </FormGroup>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={2}></Grid>
                            <ButtonContainer item xs={4}>
                                <OptionButton variant='contained' color='secondary' onClick={save}>
                                    Create Project
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
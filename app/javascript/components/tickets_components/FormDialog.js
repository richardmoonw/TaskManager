import React, { useState } from 'react'
import { Dialog, DialogContent, Button, Grid, IconButton, TextField,
    DialogTitle, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { styled } from '@material-ui/core/styles';
import axios from 'axios';
import DropMenu from './DropMenu';

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

const TitleIcon = styled(AddCircleOutlineOutlinedIcon)({
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

const FormattedDropMenu = styled(DropMenu)({
    width: "100%"
});

const priorityItems = [
    {
        id: 1,
        name: 'High'
    },
    {
        id: 2,
        name: 'Medium'
    },
    {
        id: 3,
        name: 'Low'
    },
]

const statusItems = [
    {
        id:1,
        name: 'Backlog'
    },
    {
        id:2,
        name: 'Selected for development'
    },
    {
        id:3,
        name: 'In progress'
    },
    {
        id:4,
        name: 'Done'
    },
]

// Function used to render the New Ticket Component.
export default function FormDialog(props) {
    const { open, setOpen } = props;
    const [priority, setPriority] = useState(priorityItems[0])
    const [assignee, setAssignee] = useState([])
    const [reporter, setReporter] = useState([])
    const [status, setStatus] = useState(statusItems[0])
    const [title, setTitle] = useState('')
    const [description,setDescription] = useState('')

    const changePriority = (value) =>{
        setPriority(value)
    }
    const changeAssignee = (value) =>{
        setAssignee(value)
    }
    const changeReporter = (value) =>{
        setReporter(value)
    }
    const changeStatus = (value) =>{
        setStatus(value)
    }

    // Function used to create a new ticket in the server.
    const post = () =>{
        var repo = null
        var ass = null
        if(reporter.length != 0){
            if(reporter.id != 0){
                repo = reporter.id
            }
        }
        if(assignee.length !=0){
            if(assignee.id !=0){
                ass = assignee.id
            }
        }
        if(title === '' || description === ''){
            return;
        }
        close()
        const new_data = {
            title: title,
            description: description,
            priority: priority.name,
            status: status.name,
            reporter: repo,
            assignee: ass,
            project_id: props.project_id
        }
        
        axios.post('/api/v1/tickets',new_data)
        .then(function(response) {
            // console.log(response)
            props.setFlag(!props.flag)
        })
        .catch(resp=> console.log(resp))
    }

    // Function used to close the dialog.
    const close = () =>{
        setOpen(false)
        setTitle('')
        setDescription('')
    }

    return (
        <Dialog open={open} onClose={close} maxWidth='md' fullWidth={true}>
            {/* Dialog Header */}
            <TitleContainer>
                <Grid container>
                    <Grid item xs={11}></Grid>
                    <ButtonContainer item xs={1}>
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
                        <Title>Create Ticket</Title>     
                    </Grid>
                </Grid>
            </TitleContainer>

            {/* Dialog Body */}
            <FormattedDialogContent>
                <Grid container>
                    {/* Ticket Name and Description */}
                    <SidePanel item xs={6}>
                        <Grid container>
                            <Grid item xs={12}>
                                <InfoText>Ticket general information:</InfoText>
                            </Grid>
                            <Grid item xs={12}>
                                <FormattedTextField
                                    id="title"
                                    label="Type the ticket name"
                                    variant="outlined"
                                    inputProps={{ maxLength: 120 }}
                                    value={title}
                                    onChange={(e)=> setTitle(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormattedTextField
                                    id="Description"
                                    label="Description"
                                    variant="outlined"
                                    inputProps={{ maxLength: 120 }}
                                    multiline
                                    rows={2}
                                    value={description}
                                    onChange={(e)=> setDescription(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </SidePanel>
                    <Grid item xs={6}>
                        <Grid container>
                            <Grid item xs={12}>
                                <InfoText>Details:</InfoText>
                            </Grid>
                            <Grid item xs={6}>
                                <FormattedDropMenu title='Priority' items={priorityItems} current={1} setValue={changePriority}/>
                            </Grid>
                            <Grid item xs={6}>
                                <FormattedDropMenu title='Status' items={statusItems} current={1} setValue={changeStatus}/>
                            </Grid>
                            <Grid item xs={6}>
                                <FormattedDropMenu title='Assignee' items={props.employees} current={0} setValue={changeAssignee}/>
                            </Grid>
                            <Grid item xs={6}>
                                <FormattedDropMenu title='Reporter' items={props.employees} current={0} setValue={changeReporter} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={2}></Grid>
                    <ButtonContainer item xs={4}>
                        <OptionButton variant='contained' color='secondary' onClick={post}>Create</OptionButton>
                    </ButtonContainer>
                    <ButtonContainer item xs={4}>
                        <OptionButton variant='contained' onClick={close}>Maybe later</OptionButton>
                    </ButtonContainer>
                </Grid>
            </FormattedDialogContent>
        </Dialog>
    )
}
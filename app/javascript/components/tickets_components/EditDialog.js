import React, { useState, useEffect } from 'react'
import { Grid, TextField, Dialog, DialogTitle, DialogContent, 
    IconButton, Button, Typography } from '@material-ui/core';
import axios from 'axios'
import DropMenu from './DropMenu'
import Comment from './Comment';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SendIcon from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';
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
export default function EditDialog(props) {
    const { open, setOpen, employees, ticket, reporter_id, assignee_id, employee_id} = props;

    // Comments variables
    const [comments, setComments] = useState([]);
    const [flag, setFlag] = useState(false);
    const [newComment, setNewComment] = useState('');

    const current_priority_id = priorityItems.find(x => x.name === ticket.priority).id;
    const current_status_id = statusItems.find(x => x.name === ticket.status).id;

    const [priority, setPriority] = useState(priorityItems.find(x => x.name === ticket.priority))
    const [assignee, setAssignee] = useState(employees.find(x => x.id == assignee_id))
    const [reporter, setReporter] = useState(employees.find(x => x.id == reporter_id))
    const [status, setStatus] = useState(statusItems.find(x => x.name === ticket.status))
    const [title, setTitle] = useState(ticket.title)
    const [description,setDescription] = useState(ticket.description)

    // Comments requests
    useEffect(() => {
		const url = `/api/v1/tickets/${props.ticket.id}`
        axios.get(url)
            .then(function (response) {
				setComments(response.data.comments);
            })
            .catch(resp => console.log(resp))
    }, [flag])
    
    const updateComment = (comment_id, comment_body) => {
        let updated_comment = {
            comment: {
                comment: comment_body
            }
        }
        axios.put(`/api/v1/comments/${comment_id}`, updated_comment, { withCredentials: true })
            .then(response => {
                setFlag(!flag)
            })
            .catch(error => {
                console.log("There was an error updating the comment");
            })
    }

    const deleteComment = (comment_id) => {
        axios.delete(`/api/v1/comments/${comment_id}`, { withCredentials: true })
            .then(response => {
                setFlag(!flag)
            })
            .catch(error => {
                console.log("There was an error deleting the comment");
            })
    }

    const createComment = () => {
        let new_comment = {
            comment: {
                comment: newComment,
                employee_id: employee_id,
                ticket_id: ticket.id
            }
        }
        axios.post('/api/v1/comments', new_comment, { withCredentials: true })
            .then(response => {
                setFlag(!flag)
            })
            .catch(error => {
                console.log("There was an error creating the comment");
            })
        setNewComment('');
    }

    // Functions used to edit the Ticket
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

    // Function used to edit the comment in the server
    const put = () =>{
        var repo = null
        var ass = null
        
            if(reporter.id != 0){
                repo = reporter.id
            }
        
            if(assignee.id !=0){
                ass = assignee.id
            }
        
        if(title === '' || description === ''){
            return;
        }
        
        setOpen(false)
        axios({
            method: 'put',
            url: `/api/v1/tickets/${ticket.id}`,
            data: {
                title: title,
                description: description,
                priority: priority.name,
                status: status.name,
                reporter: repo,
                assignee: ass,
                project_id: props.project_id
            }
        })
        .then(function(response) {
            props.setFlag(!props.flag)
        })
        .catch(resp=> console.log(resp))
    }
    
    return (
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth='md' fullWidth={true}>
            {/* Dialog Header */}
            <TitleContainer>
                <Grid container>
                    <Grid item xs={11}></Grid>
                    <ButtonContainer item xs={1}>
                        <IconButton onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </ButtonContainer>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <TitleIcon fontSize="large" />
                    </Grid>
                    <Grid item xs={12}>
                        <Title>Edit Ticket</Title>     
                    </Grid>
                </Grid>
            </TitleContainer>
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
                                    label="Type the ticket description"
                                    variant="outlined"
                                    inputProps={{ maxLength: 5000 }}
                                    multiline
                                    rows={2}
                                    value={description}
                                    onChange={(e)=> setDescription(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormattedDropMenu title='Priority' items={priorityItems} current={current_priority_id} setValue={changePriority}/>
                            </Grid>
                            <Grid item xs={6}>
                                <FormattedDropMenu title='Status' items={statusItems} current={current_status_id}  setValue={changeStatus}/>
                            </Grid>
                            <Grid item xs={6}>
                                <FormattedDropMenu title='Assignee' items={employees} current={assignee_id} setValue={changeAssignee}/>
                            </Grid>
                            <Grid item xs={6}>
                                <FormattedDropMenu title='Reporter' items={employees} current={reporter_id} setValue={changeReporter} />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={1}></Grid>
                            <ButtonContainer item xs={5}>
                                <OptionButton variant='contained' color='primary' onClick={put}>Update</OptionButton>
                            </ButtonContainer>
                            <ButtonContainer item xs={5}>
                                <OptionButton variant='contained' onClick={() => setOpen(false)}>Maybe later</OptionButton>
                            </ButtonContainer>
                        </Grid>
                    </SidePanel>
                    <Grid item xs={6}>
                        <Grid container>
                            <Grid item xs={12}>
                                <InfoText>Comments:</InfoText>
                            </Grid>

                            {/* Render comments */}
                            <Grid container>
                                <Grid item xs={10}>
                                    <FormattedTextField
                                        label="Enter a comment" 
                                        variant="outlined"
                                        value={newComment}
                                        multiline
                                        rows={2}
                                        onChange={(event) => setNewComment(event.target.value)}    
                                    />
                                </Grid>
                                <Grid item xs={1}></Grid>
                                <ButtonContainer item xs={1}>
                                    <IconButton onClick={createComment}>
                                        <SendIcon color="primary" />
                                    </IconButton>
                                </ButtonContainer>
                            </Grid>
                        
                            { comments.map(comment => {
                                return <Comment 
                                            key={comment.id} 
                                            comment={comment} 
                                            employee_id={employee_id}
                                            updateComment={updateComment}
                                            deleteComment={deleteComment} />
                            })}
                        </Grid>
                    </Grid>    
                </Grid>
            </FormattedDialogContent>
        </Dialog>
    )
}
import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import axios from 'axios'
import DropMenu from './DropMenu'
import Comment from './Comment';

const useStyles = makeStyles({
    bottom_field: {
        marginTop: '10px',
        width: '98%'
    },
    popup: {
        minHeight: '70%',
        backgroundColor: "#f7f7f7"
    },
    title: {
        width: '98%'
    },
    description: {
        width: '98%'
    },
    extras: {
        paddingLeft: '14px'
    }

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
    const classes = useStyles();
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
    }





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
        <Dialog open={open} maxWidth='md' fullWidth={true} className={classes.popup}>

            <DialogContent className={classes.popup}>
                <Grid item container xs={12} justify='flex-end' >
                    <Button onClick={() => setOpen(false)}>
                        X
                        </Button>
                </Grid>
                <Grid container direction='row' className={classes.popup}>
                    <Grid item container md={7} xs={12} direction='column'>
                        <Grid item className={classes.title} >
                            <TextField
                                className={classes.title}
                                id="title"
                                label="Title"
                                variant="outlined"
                                inputProps={{ maxLength: 120 }}
                                multiline
                                rowsMax={2}
                                value={title}
                                onChange={(e)=> setTitle(e.target.value)}
                            />
                        </Grid>
                        <Grid item className={classes.bottom_field} >

                            <TextField
                                className={classes.description}
                                rows={5}
                                id="Description"
                                label="Description"
                                variant="outlined"
                                inputProps={{ maxLength: 5000 }}
                                multiline
                                rowsMax={22}
                                value={description}
                                onChange={(e)=> setDescription(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container md={5} xs={12} className={classes.extras} direction='column'>
                        <DropMenu title='Priority' items={priorityItems} current={current_priority_id} setValue={changePriority}/>
                        <DropMenu title='Assignee' items={employees} current={assignee_id} setValue={changeAssignee}/>
                        <DropMenu title='Reporter' items={employees} current={reporter_id} setValue={changeReporter} />

                        <DropMenu title='Status' items={statusItems} current={current_status_id}  setValue={changeStatus}/>
                        <Grid item container spacing={2} >
                            <Grid item >
                                <Button variant='contained' color='primary' onClick={put}>
                                    Update
                                </Button>
                            </Grid>

                        </Grid>

                    </Grid>


                </Grid>
                {/* Render comments */}
                <h1>Comments</h1>
                <TextField
                    label="Write a comment" 
                    varian="outlined"
                    value={newComment}
                    onChange={(event) => setNewComment(event.target.value)}    
                />
                <Button onClick={createComment}>Save</Button>
				{ comments.map(comment => {
                    return <Comment 
                                key={comment.id} 
                                comment={comment} 
                                employee_id={6}
                                updateComment={updateComment}
                                deleteComment={deleteComment} />
				})}

            </DialogContent>
        </Dialog>
    )
}
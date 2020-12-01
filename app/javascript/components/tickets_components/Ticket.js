import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import { Card, CardContent, Button, Grid, Typography } from '@material-ui/core';
import EditDialog from '../tickets_components/EditDialog';
import axios from 'axios';

// Styled Components
const TicketContainer = styled(Card)({
	width: '100%',
	marginBottom: '1rem',
	boxSizing: 'border-box',
	paddingBottom: '-0.5rem'
});

const TicketTitle = styled(Typography)({
	width: '85%',
	fontSize: 16,
	fontWeight: 'bold',
	boxSizing: 'border-box',
	margin: '0.5rem 0.5rem 1rem 0'
});

const HighPriority = styled(Typography)({
	width: '90%',
	color: "#7d0000",
	fontSize: "0.8rem",
	backgroundColor: "#ff9696",
	borderRadius: "0.2rem",
	padding: "0.3rem 0",
	textAlign: "center"
});

const MediumPriority = styled(Typography)({
	width: '90%',
	color: "#7d5e00",
	fontSize: "0.8rem",
	backgroundColor: "#ffe491",
	borderRadius: "0.2rem",
	padding: "0.3rem 0",
	textAlign: "center"
});

const LowPriority = styled(Typography)({
	width: '90%',
	color: "#2c6e00",
	fontSize: "0.8rem",
	backgroundColor: "#bdff91",
	borderRadius: "0.2rem",
	padding: "0.3rem 0",
	textAlign: "center"
});

const AsigneeContainer = styled(Grid)({
	textAlign: "right"
});

// Function used to render the Ticket Component.
export default function Ticket(props) {
	const [open, setOpen] = useState(false);
	const assignee_id = props.ticket.assignee === null ? 0 : props.ticket.assignee
	const assignee_name = props.ticket.assignee === null ? 'Not assigned': props.employees.find(x => x.id === assignee_id).name;
	const reporter_id = props.ticket.reporter === null ? 0 : props.ticket.reporter;

	// Function used to delete the ticket from the server
	const deleteTicket = () => {
		setOpen(false)
		axios({
			method: 'delete',
			url: `/api/v1/tickets/${props.ticket.id}`
		})
		.then(function(response) {
			props.setFlag(!props.flag)
		})
		.catch(resp=> console.log(resp))
	}
	
	return (
		<>	
			<TicketContainer>
				<CardContent>
					{/* Header */}
					<Grid container alignItems='center'>
						<Grid item xs={5} >
							<Typography color="textSecondary" >
								ID-{props.ticket.id}
							</Typography>
						</Grid>
						<Grid container item xs={7} alignItems='center' justify='flex-end'>
							<Grid item >
								<Button size="small" onClick={()=>setOpen(true)}>Edit</Button>
							</Grid>
							<Grid item >
								<Button size="small" onClick={()=>deleteTicket()}>Delete</Button>
							</Grid>
						</Grid>
					</Grid>

					{/* Title */}
					<TicketTitle>
						{props.ticket.title}
					</TicketTitle>

					{/* Priority and asignee */}
					<Grid container>
						<Grid item xs={3}>
							{props.ticket.priority === "High" && 
								<HighPriority>High</HighPriority>}
							{props.ticket.priority === "Medium" && 
								<MediumPriority>Medium</MediumPriority>}
							{props.ticket.priority === "Low" && 
								<LowPriority>Low</LowPriority>}
						</Grid>
						<AsigneeContainer item xs={9}>
							<Typography color="textSecondary" >
								{assignee_name}
							</Typography>
						</AsigneeContainer>
					</Grid>
				</CardContent>
			</TicketContainer>

			{/* Dialog to edit a ticket */}
			<EditDialog
				open={open}
				setOpen={setOpen}
				employees ={props.employees}
				ticket={props.ticket}
				reporter_id ={reporter_id}
				assignee_id={assignee_id}
				project_id={props.project_id}
				flag ={props.flag}
				setFlag={props.setFlag}
				employee_id={props.employee_id}
			></EditDialog>
		</>
	);
}
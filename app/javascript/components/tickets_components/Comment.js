import React from 'react';
import { Grid, Button, TextField, Typography, IconButton } from '@material-ui/core';
import ProfileImg from 'images/profile.png'
import DeleteIcon from '@material-ui/icons/Delete';
import Create from '@material-ui/icons/Create';
import SendIcon from '@material-ui/icons/Send';
import { styled } from '@material-ui/styles';
import axios from 'axios';

const styles = {

    commentProfileImg: {
        width: "100%",
        borderRadius: '1000px'
    }
}

// Styled Components
const FormattedTextField = styled(TextField)({
    width: '100%',
    marginBottom: '1rem'
});

const CommentContainer = styled(Grid)({
	width:"100%",
	backgroundColor: "white",
	boxSizing: "border-box",
	margin: "0.5rem 0 0.5rem 1rem",
	padding: "1rem",
	borderRadius: "0.7rem"
});

const ButtonContainer = styled(Grid)({
    textAlign: "center"
});

const ImageContainer = styled(Grid)({
	textAlign: "center"
});

const ProfileName = styled(Typography)({
	color: "#000",
	fontFamily: "Arial",
	fontSize: '1rem',
	marginLeft: '0.5rem',
	fontWeight: "bold"
})

const Date = styled(Typography)({
	color: "#888",
	fontFamily: "Arial",
	fontSize: '0.7rem',
	marginLeft: '0.5rem'
});

const EditButtonsContainer = styled(Grid)({
	textAlign: "right"
});

const CommentText = styled(Grid)({
	marginTop: "1rem"
})


class Comment extends React.Component {

	constructor(props) {
		super(props);

		this.state={
			editable: this.props.employee_id === this.props.comment.employee_id,
			employee_name: '',
			isEditing: false,
			comment: this.props.comment.comment
		}

		this.editComment = this.editComment.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
		axios.get(`/api/v1/employees/${this.props.comment.employee_id}`, { withCredentials: true })
			.then(response => {
				this.setState({
					employee_name: response.data.name
				})
			})
			.catch(error => {
				console.log('There was an error fetching the user');
			})
	}

	// Function used to determine if a comment is being editted or not.
	editComment(){
		let old_state = { ...this.state }
		this.setState({
			isEditing: !old_state.isEditing
		})
	}

	// Function used to handle the changes in any of the TextFields.
	handleChange(event){
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	// Function triggered when a comment is updated.
	handleUpdate(){
		this.props.updateComment(this.props.comment.id, this.state.comment)
		this.editComment()
	}

	// Function triggered when a comment is deleted.
	handleDelete(){
		this.props.deleteComment(this.props.comment.id)
	}

	render() {
		return (
			<Grid container>
				<CommentContainer item xs={12}>
					<Grid container>
						<ImageContainer item xs={1}>
							<img style={styles.commentProfileImg} alt={this.props.comment.employee_id} src={ProfileImg} />
						</ImageContainer>
						<Grid item xs={7}>
							<Grid container>
								<Grid item xs={12}>
									<ProfileName>{this.state.employee_name}</ProfileName>
								</Grid>
								<Grid item xs={12}>
									<Date>{this.props.comment.created_at}</Date>
								</Grid>
							</Grid>
						</Grid>
						{ this.state.editable && 
							<>
								<EditButtonsContainer item xs={4}>
									<IconButton onClick={this.editComment}>
										<Create />
									</IconButton>
									<IconButton onClick={this.handleDelete}>
										<DeleteIcon />
									</IconButton>
								</EditButtonsContainer>
							</>		
						}
					</Grid>
					{ !this.state.isEditing && 
						<CommentText container>
							<Grid item xs={12}>{this.props.comment.comment}</Grid>
						</CommentText>
					}
					{ this.state.isEditing && 
					<>
						<CommentText container>
							<Grid item xs={10}>
								<FormattedTextField
									onChange={this.handleChange}
									label="Edit comment"
									variant="outlined"
									name="comment"
									multiline
									rows={2}
									value={this.state.comment}
								/>
							</Grid>
							<EditButtonsContainer item xs={2}>
								<IconButton onClick={this.handleUpdate}>
									<SendIcon color="primary" />
								</IconButton>
							</EditButtonsContainer>
						</CommentText>
					</>
					}
					
				</CommentContainer>
			</Grid>
		)
	}
}

export default Comment;
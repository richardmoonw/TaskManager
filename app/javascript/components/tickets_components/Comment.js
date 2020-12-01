import React from 'react';
import { Grid, Button, TextField, Typography, Container } from '@material-ui/core';
import ProfileImg from 'images/profile.png'
import DeleteIcon from '@material-ui/icons/Delete';
import Create from '@material-ui/icons/Create';
import { styled } from '@material-ui/styles';
import axios from 'axios';

const styles = {

    commentProfileImg: {
        width: "50%",
        borderRadius: '1000px'
    },

    commentTextField: {
        width: "90%",
        boxSizing: "border-box",
        marginTop: "0.5rem",
        padding: "0rem",
        marginBottom: "1rem"
    }
}

const CommentContainer = styled(Grid)({
	paddingLeft: "1rem",
	paddingTop: '1.5rem',
	paddingBottom: '1.5rem',
	boxSizing: "border-box",
	borderBottom: "0.01rem dotted lightgray"
})

const SaveButton = styled(Button)({
    width: "80%",
    backgroundColor: "#3bb1d1",
    color: 'white',
    borderRadius: "0.5rem"
})

const CommentTitle = styled(Container)({
	marginTop: '0.5rem'
})

const ImageContainer = styled(Grid)({
	textAlign: "center"
})

const Date = styled(Typography)({
	color: "#888",
	fontSize: '0.7rem',
	marginLeft: '0.5rem'
})

const CommentBody = styled(Grid)({
	width:"100%",
	backgroundColor: "white",
	marginTop: "0.5rem",
	marginRight: "0.5rem",
	padding: "1rem",
	borderRadius: "0.7rem"
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

	editComment(){
		let old_state = { ...this.state }
		this.setState({
			isEditing: !old_state.isEditing
		})
	}

	handleChange(event){
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleUpdate(){
		this.props.updateComment(this.props.comment.id, this.state.comment)
		this.editComment()
	}

	handleDelete(){
		this.props.deleteComment(this.props.comment.id)
	}

	render() {
		return (
			<Grid container>
				<CommentContainer item xs={10}>
					<Grid container>
						<ImageContainer item xs={1}>
							<img style={styles.commentProfileImg} alt={this.props.comment.employee_id} src={ProfileImg} />
						</ImageContainer>
						<Grid item xs={8}>
							<CommentTitle>
								<strong>{this.state.employee_name}</strong>
								<Date>{this.props.comment.created_at}</Date>
							</CommentTitle>
						</Grid>
						{ this.state.editable && 
							<>
								<Grid item xs={3}>
									<Button onClick={this.editComment}>
										<Create />
									</Button>
									<Button onClick={this.handleDelete}>
										<DeleteIcon />
									</Button>
								</Grid>
							</>		
						}
					</Grid>
					{ !this.state.isEditing && 
						<Grid container>
							<CommentBody item xs={12}>{this.props.comment.comment}</CommentBody>
						</Grid>
					}
					{ this.state.isEditing && 
					<>
						<Grid container>
							<Grid item xs={12}>
								<TextField
									onChange={this.handleChange}
									label="Edit your comment"
									name="comment"
									multiline
									rows={3}
									value={this.state.comment}
									style={styles.commentTextField}
								/>
							</Grid>
							<Grid item xs={3}>
								<SaveButton 
									onClick={this.handleUpdate}
								>Save</SaveButton>
							</Grid>
						</Grid>
					</>
					}
					
				</CommentContainer>
			</Grid>
		)
	}
}

export default Comment;
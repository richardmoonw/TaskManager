import React from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import ProfileImg from 'images/profile.png'
import DeleteIcon from '@material-ui/icons/Delete';
import Create from '@material-ui/icons/Create';
import { styled } from '@material-ui/styles';

const styles = {

    comment: {
        paddingLeft: "1rem",
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
        boxSizing: "border-box",
        borderBottom: "0.01rem dotted lightgray"
    },

    commentProfileImg: {
        width: "80%",
        borderRadius: '1000px'
    },

    commentTitle: {
        marginTop: '0.5rem'
    },

    date: {
        color: "#888",
        fontSize: '0.7rem',
        marginLeft: '0.5rem'
    },

    commentBody: {
        width:"100%",
        backgroundColor: "white",
        marginTop: "0.5rem",
        marginRight: "0.5rem",
        padding: "1rem",
        borderRadius: "0.7rem"
    },

    commentTextField: {
        width: "90%",
        boxSizing: "border-box",
        marginTop: "0.5rem",
        padding: "0rem",
        marginBottom: "1rem"
    }
}

const SaveButton = styled(Button)({
    width: "80%",
    backgroundColor: "#3bb1d1",
    color: 'white',
    borderRadius: "0.5rem"
})

class Comment extends React.Component {

	constructor(props) {
		super(props);

		this.state={
			editable: this.props.comment.email === this.props.email,
			isEditing: false,
			comment: this.props.comment.comment
		}

		this.editComment = this.editComment.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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

	handleSubmit(){
		this.props.editComment(this.props.comment.id, this.state.comment)
		this.editComment()
	}

	render() {
		return (
			<Grid container style={{backgroundColor: "#f7f7f7"}}>
				<Grid item xs={12} style={styles.comment}>
					<Grid container>
						<Grid item xs={1}>
							<img style={styles.commentProfileImg} alt={this.props.comment.person} src={ProfileImg} />
						</Grid>
						<Grid item xs={8}>
							<p style={styles.commentTitle}>
								<strong>{this.props.comment.person}</strong>
								<span style={styles.date}>{this.props.comment.created}</span>
							</p>
						</Grid>
						{ this.state.editable && 
							<>
								<Grid item xs={3}>
									<Button onClick={this.editComment}>
										<Create />
									</Button>
									<Button onClick={() => {this.props.deleteComment(this.props.comment.id)}}>
										<DeleteIcon />
									</Button>
								</Grid>
							</>		
						}
					</Grid>
					{ !this.state.isEditing && 
						<Grid container>
							<Grid item xs={12} style={styles.commentBody}>{this.props.comment.comment}</Grid>
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
									onClick={this.handleSubmit}
								>Save</SaveButton>
							</Grid>
						</Grid>
					</>
					}
					
				</Grid>
			</Grid>
		)
	}
}

export default Comment;
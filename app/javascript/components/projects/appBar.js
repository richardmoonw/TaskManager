import React from 'react';
import { Navbar } from '../Navbar';


function ButtonAppBar() {
	return (
		<div className={classes.root}>
			<AppBar position="static" color="default">
				<Toolbar>
					<img src="./forkie.png" alt=" "/>
				<Typography variant="h6" className={classes.title}>
					My Projects
				</Typography>
				<IconButton 
					color="inherit"
					aria-controls="simple-menu" 
					aria-haspopup="true" 
					onClick={handleClick}
				>
					<AccountCircle />
				</IconButton>
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<MenuItem onClick={handleClose}>Projects</MenuItem>
					<MenuItem onClick={handleClose}>My account</MenuItem>
					<MenuItem onClick={handleClose}>Logout</MenuItem>
				</Menu>
				</Toolbar>
			</AppBar>
		</div>
  	);
}

export default ButtonAppBar;
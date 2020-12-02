import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Logo from 'images/forkie.png';
import not_found_background from 'images/not_found.jpg';
import { Link } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';

// Styled components
const BackgroundImageContainer = styled(Grid)({
	width: "104%",
    minHeight: "96vh",
    backgroundImage: `url(${not_found_background})`,
    backgroundPosition: "center"
});

const BrandContainer = styled(Grid)({
	backgroundColor: "white",
	padding: "0 0 3rem 0"
});

const ImageContainer = styled(Grid)({
});

const HomeContainer = styled(Grid)({
    marginTop: '12rem'
});

const Title = styled(Typography)({
    fontSize: "7rem",
    fontFamily: "Arial",
	marginBottom: "0rem",
	fontWeight: "bold"
});

const Description = styled(Typography)({
    fontSize: "3rem",
    color: "#5e5e5e",
	fontFamily: "Verdana",
	fontWeight: "bold"
});

const FormattedLink = styled(Link)({
    textDecoration: "none"
});


// NotFound Component
function NotFound() {
const [show, setShow] = useState(false);

    useEffect(() => {
		setTimeout(()=>{
		 	setShow(true);
		}, 2000)
	}, [])
  
	return(
		
		<>
			{ show &&  
				<>
					<BrandContainer container>
						<Grid container>
							{/* Empty space at the left */}
							<Grid item xs={1}></Grid>

							{/* Top Panel: Logo */}
							<ImageContainer item xs={2}>
								<FormattedLink to="/">
									<img alt="logo" width="70%" src={Logo}></img>
								</FormattedLink>
							</ImageContainer>

							<Grid item xs={8}></Grid>
						</Grid>
					</BrandContainer>

					{/* Container for the whole page */}
					<BackgroundImageContainer container spacing={10}>

						{/* Slogan and description */}
						<Grid container>
							<Grid item xs={1}></Grid>
							<HomeContainer item xs={5}>
								<Title>Oops!</Title>
								<Description>We can't seem to find the page you're looking for.</Description>
							</HomeContainer>
						</Grid>
					</BackgroundImageContainer>
				</>
			}
		</>
	)

}

export default NotFound;
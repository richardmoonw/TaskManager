import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Ticket from '../tickets_components/Ticket';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

// Styled Components
const ColumnContainer = styled(Grid)({
    padding: '1rem'
});

const ColumnTitle = styled(Typography)({
    fontFamily: "Arial",
    fontWeight: "bold",
    paddingLeft: "2rem"
});

const HeaderContainer = styled(Grid)({
    marginBottom: "1rem"
});

// Function used to return the Column Component.
export default function Column(props) {
    const ColumnIcon = styled(FiberManualRecordIcon)({
        color: props.color,
        float: "left"
    })
    
    return (
        <Grid item md={3} xs={12} sm={6}>
            <ColumnContainer container>
                {/* Column Title */}
                <HeaderContainer item xs={12}>
                    <ColumnIcon fontSize="small" />
                    <ColumnTitle>{props.col_title}: {props.tickets.length}</ColumnTitle>    
                </HeaderContainer>

                {/* Tickets */}
                <Grid item xs={12}>
                    {props.tickets.map(ticket => {
                        return(
                            <Ticket 
                                key={ticket.id} 
                                ticket={ticket} 
                                employees={props.employees} 
                                project_id={props.project_id}
                                flag ={props.flag}
                                setFlag={props.setFlag}
                                employee_id={props.employee_id}
                            />
                        )
                    })} 
                </Grid>
            </ColumnContainer>
        </Grid>


    );
}
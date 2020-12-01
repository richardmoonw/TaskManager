
import Grid from '@material-ui/core/Grid';
import React, {useState} from 'react';
import { styled } from '@material-ui/core/styles';
import { MenuItem, InputLabel, FormControl, Select } from '@material-ui/core';

// Styled Components
const FormattedFormControl = styled(FormControl)({
    width: "90%",
    marginBottom: "1rem"
})

export default function DropMenu(props) {
    const items = props.items;
    const [selectedItem, setSelectedItem] = useState(items.find(x => x.id === props.current));
    
  
    const handleChange = (event) => {
        setSelectedItem(event.target.value)
        props.setValue(event.target.value)
    };
    const getItemIndex = (id, items) => {
        for(let i =0; i<items.length; i++){
            if(items[i].id === id){
                return i;
            }
        }
        return '';
    };

    return (
        <Grid item>
            <Grid item xs={12}>
                <FormattedFormControl>
                    <InputLabel shrink id={props.title}>{props.title}</InputLabel>
                    <Select 
                        labelId={props.title}
                        displayEmpty 
                        value={items[getItemIndex(selectedItem.id,items)]} 
                        onChange={handleChange}
                    >
                        {items.map(item => {
                            return(
                                <MenuItem key = {item.id} value = {item}>{item.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormattedFormControl>
            </Grid>
        </Grid>
    );
}
import React from 'react';

import { Box } from '@mui/material';
import { ListItem, ListItemButton } from '@mui/material';
import { FixedSizeList } from 'react-window';



export default function VirtualizedList(props) {
  let itemsArr=[];
  const renderRow = (windowEle) => {
    const { index, style } = windowEle;
    const id = itemsArr[index]["id"]
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton sx={{justifyContent:'space-around'}} id={id} onClick={props.onClick}>
            <div>Conent {id}</div>
            <div>Default {itemsArr[index]["default"]}</div>
            {itemsArr[index]['data'].map((data, i)=>{
              return(
                <div>{data.name} {data.value}</div>
              )
            })}
        </ListItemButton>
      </ListItem>
    );
  }
  itemsArr=props.data
  return (
    <Box
      sx={{ width: '100%', bgcolor: '#393939' }}
    >
      <FixedSizeList
        height={600}
        itemSize={46}
        itemCount={props.data.length}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
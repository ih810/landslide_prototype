import React, { useState, useEffect } from "react";
import { DataGrid, useGridApiContext, useGridState, gridClasses } from "@mui/x-data-grid";
import { GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import Pagination from '@mui/material/Pagination';


export default function ExportSelectorGrid(props) {
  const [loadedRows, setLoadedRows] = useState([]);
  const [pageView, setPageView] = useState();
  const susValueType = {
    type: 'number',
    width: 130,
    cellClassName: 'font-tabular-nums',
  };
  
  function CustomPagination() {
    const apiRef = useGridApiContext();
    const [state] = useGridState(apiRef);
    console.log('len',props.tableData[0].length)
    state.pagination.pageCount = parseInt(Math.ceil((props.tableData[0].length/100)))
    setPageView(state.pagination.page)
    return (
      <Pagination
        color="primary"
        count={Math.ceil((props.tableData[0].length/100))}
        page={state.pagination.page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer className={gridClasses.toolbarContainer}>
        <GridToolbarExport />
        <GridToolbarFilterButton />
      </GridToolbarContainer>
    );
  }

  let row = [];
  useEffect(() => {
    console.log(props.tableData);
    console.log('pageView',pageView);
    if (props.tableData) {
      for (let i = pageView * 100; i <(pageView * 100 + 99) && props.tableData[0][i] !== undefined; i++) {
        console.log('i:', i, 'x', i % props.tableData.width, 'y', Math.floor(i / props.tableData.width), 'sus', props.tableData[0][i])
        row.push({ 
          id: i, 
          x: i % props.tableData.width, 
          y: Math.floor(i / props.tableData.width), 
          sus: props.tableData[0][i] 
        });
        if(i+1 >= (pageView * 100 + 99)){
          console.log('now', i, pageView)
          console.log('row', row)
        }
      }
      console.log('loadedRows', loadedRows)
    }

    setLoadedRows([...row]);
      console.log('new loadedRows', loadedRows)
    }, [props.tableData, pageView]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      {props.tableData && props.tableData[0].length > 0 ? (
        <>
        <DataGrid
          columns={[
            { field: "x", headerName: "X", width: 100, ...susValueType },
            { field: "y", headerName: "Y", width: 100, ...susValueType },
            { field: "sus", headerName: "Susceptibility", width: 160, ...susValueType },
          ]}
          rows={loadedRows}
          components={{
            Toolbar: CustomToolbar,
            Pagination: CustomPagination
          }}
        />
        </>
      ) : null}
    </div>
  );
}

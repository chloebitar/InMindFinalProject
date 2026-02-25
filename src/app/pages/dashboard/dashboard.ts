import { Component, inject } from '@angular/core';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridApi, GridOptions } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-dashboard',
  imports: [AgGridAngular],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  // rowData = [
  //   { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
  //   { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
  //   { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  // ];

  // colDefs: ColDef[] = [
  //   { field: 'make' },
  //   { field: 'model' },
  //   { field: 'price' },
  //   { field: 'electric' },
  // ];

  rowData = [
    { Id: '1', Name: 'Tesla', Description: 'Electric SUV', Price: 64950, Status: true },
    { Id: '2', Name: 'Ford', Description: 'Truck', Price: 33850, Status: false },
    { Id: '3', Name: 'Toyota', Description: 'Compact Car', Price: 29600, Status: false },
  ];

  colDefs: ColDef[] = [
    { field: 'Id', filter: 'agNumberColumnFilter' },
    { field: 'Name', filter: 'agTextColumnFilter' },
    { field: 'Description', filter: 'agTextColumnFilter', editable: true },
    { field: 'Price', valueFormatter: (params) => '$' + params.value },
    {
      field: 'Status',
      cellRenderer: (params: { value: string }) => {
        const type = params.value ? 'available' : 'out of stock';
        return type + '</b>';
      },
    },
    {field: 'Actions', cellRenderer: () => `<button class="btn-delete" onclick="deleteRow()">Delete</button>`},
  ];

  defaultColDef: ColDef = {
    flex: 1,
  };

  gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 1,
  };

  
}

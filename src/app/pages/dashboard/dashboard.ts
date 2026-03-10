import { Component, computed, effect, inject, signal,Signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, GridApi, GridOptions } from 'ag-grid-community';

import { BaseChartDirective } from 'ng2-charts';
import type { ChartConfiguration } from 'chart.js';

import { toSignal } from '@angular/core/rxjs-interop';

import { Products } from '../../shared/services/products-service';
import { IProduct } from '../../Interfaces/product-interface';
import { DashboardDataService } from '../../shared/services/dashboard-data-service';
import { IDashboardJson } from '../../Interfaces/dashboard-json';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AgGridAngular, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private productsService = inject(Products);
  private dashboardService = inject(DashboardDataService);

  private gridApi?: GridApi<IProduct>;

  productsSig: Signal<IProduct[]> = toSignal(this.productsService.getAllProducts(), {
    initialValue: [],
  });


   dashSig: Signal<IDashboardJson> = toSignal(this.dashboardService.getDashboard(), {
    initialValue: {
      kpis: { totalRevenue: 0, totalOrders: 0, avgOrderValue: 0, totalValue: 0 },
      monthlyRevenue: [],
      orders: [],
      recentActivity: [],
    } 
  });

  rowData = signal<IProduct[]>([]);

  colDefs: ColDef<IProduct>[] = [
    { headerName: 'Id', field: 'id', filter: 'agNumberColumnFilter', maxWidth: 90 },
    { headerName: 'Name', field: 'title', filter: 'agTextColumnFilter', minWidth: 220 },
    { headerName: 'Category', field: 'category', filter: 'agTextColumnFilter', maxWidth: 180 },
    { headerName: 'Description', field: 'description', filter: 'agTextColumnFilter', editable: true, minWidth: 260,},
    {headerName: 'Price', field: 'price', filter: 'agNumberColumnFilter', maxWidth: 120, valueFormatter: (p) => `$${Number(p.value ?? 0).toFixed(2)}`},
    {headerName: 'Actions', maxWidth: 140, sortable: false, filter: false,
      cellRenderer: () => `<button class="btn-delete">Delete</button>`,
      onCellClicked: (params) => {
        const target = params.event?.target as HTMLElement;
        if (target?.classList?.contains('btn-delete')) {
          this.deleteRow(params.data as IProduct);
        }
      },
    },
  ];

  defaultColDef: ColDef = { flex: 1, resizable: true, sortable: true, filter: true };

  gridOptions: GridOptions<IProduct> = {
    pagination: true,
    paginationPageSize: 6,
    rowHeight: 56,
  };

  kpis = computed(() => this.dashSig().kpis);
  totalRevenue = computed(() => this.kpis().totalRevenue);
  totalOrders = computed(() => this.kpis().totalOrders);
  avgOrderValue = computed(() => this.kpis().avgOrderValue);
  totalValue = computed(() => this.kpis().totalValue);

  recentActivity = computed(() => this.dashSig().recentActivity);

  revenueLineType = 'line' as const;
  revenueLineData: ChartConfiguration['data'] = { labels: [], datasets: [] };
  revenueLineOptions: ChartConfiguration['options'] = { responsive: true };

  ordersBarType = 'bar' as const;
  ordersBarData: ChartConfiguration['data'] = { labels: [], datasets: [] };
  ordersBarOptions: ChartConfiguration['options'] = { responsive: true };


  constructor() {
    effect(() => {
      this.rowData.set(this.productsSig());
    });

    effect(() => {
      const m = this.dashSig().monthlyRevenue;
      const labels = m.map((x) => x.month);

      this.revenueLineData = {
        labels,
        datasets: [{ data: m.map((x) => x.revenue), label: 'Revenue' }],
      };

      this.ordersBarData = {
        labels,
        datasets: [{ data: m.map((x) => x.orders), label: 'Orders' }],
      };

    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  deleteRow(product: IProduct) {
    this.gridApi?.applyTransaction({ remove: [product] });
    this.rowData.update((arr) => arr.filter((p) => p.id !== product.id));
  }
}

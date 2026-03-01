// dashboard-data.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type DashboardJson = {
  kpis: {
    totalRevenue: number;
    totalOrders: number;
    avgOrderValue: number;
    totalValue: number;
  };
  monthlyRevenue: { month: string; revenue: number; orders: number; avgOrderValue: number }[];
  orders: {
    id: string;
    date: string;
    customer: string;
    total: number;
    status: string;
    items: { productId: number; title: string; qty: number; unitPrice: number }[];
  }[];
  recentActivity: { id: string; time: string; type: string; title: string; details: string }[];
};

@Injectable({ providedIn: 'root' })
export class DashboardDataService {
  private http = inject(HttpClient);
  private url = 'assets/data/dashboard.json';

  getDashboard(): Observable<DashboardJson> {
    return this.http.get<DashboardJson>(this.url);
  }
}

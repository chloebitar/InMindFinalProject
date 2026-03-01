import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDashboardJson } from '../../Interfaces/dashboard-json';

@Injectable({ providedIn: 'root' })
export class DashboardDataService {
  private http = inject(HttpClient);

  getDashboard(): Observable<IDashboardJson> {
    return this.http.get<IDashboardJson>('assets/data/dashboard.json');
  }
}

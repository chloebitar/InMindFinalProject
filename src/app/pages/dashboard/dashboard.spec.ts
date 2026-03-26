import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Dashboard } from './dashboard';
import { Products } from '../../shared/services/products-service';
import { DashboardDataService } from '../../shared/services/dashboard-data-service';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  const productsServiceMock = {
    getAllProducts: () => of([]),
  };

  const dashboardDataServiceMock = {
    getDashboard: () =>
      of({
        kpis: {
          totalRevenue: 0,
          totalOrders: 0,
          avgOrderValue: 0,
          totalValue: 0,
        },
        monthlyRevenue: [],
        orders: [],
        recentActivity: [],
      }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        { provide: Products, useValue: productsServiceMock },
        { provide: DashboardDataService, useValue: dashboardDataServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

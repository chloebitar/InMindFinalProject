export interface IDashboardJson {
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
}

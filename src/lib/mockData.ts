// Mock data for the analytics dashboard

export interface MetricData {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface ChartDataPoint {
  name: string;
  value: number;
  date?: string;
}

export interface TableRowData {
  id: string;
  source: string;
  users: number;
  sessions: number;
  revenue: number;
  conversionRate: number;
  date: string;
}

export const metricsData: MetricData[] = [
  {
    title: 'Total Revenue',
    value: '$124,592',
    change: 12.5,
    changeLabel: '+12.5% from last month',
    icon: 'DollarSign',
    trend: 'up'
  },
  {
    title: 'Active Users',
    value: '8,549',
    change: 8.2,
    changeLabel: '+8.2% from last month',
    icon: 'Users',
    trend: 'up'
  },
  {
    title: 'Conversion Rate',
    value: '3.24%',
    change: -2.1,
    changeLabel: '-2.1% from last month',
    icon: 'Target',
    trend: 'down'
  },
  {
    title: 'Growth Rate',
    value: '24.8%',
    change: 15.3,
    changeLabel: '+15.3% from last month',
    icon: 'TrendingUp',
    trend: 'up'
  }
];

export const revenueChartData: ChartDataPoint[] = [
  { name: 'Jan', value: 85000 },
  { name: 'Feb', value: 92000 },
  { name: 'Mar', value: 88000 },
  { name: 'Apr', value: 105000 },
  { name: 'May', value: 118000 },
  { name: 'Jun', value: 124592 }
];

export const userSourceData: ChartDataPoint[] = [
  { name: 'Organic Search', value: 4200 },
  { name: 'Social Media', value: 2800 },
  { name: 'Direct Traffic', value: 1500 },
  { name: 'Email Marketing', value: 1200 },
  { name: 'Paid Ads', value: 950 }
];

export const conversionFunnelData: ChartDataPoint[] = [
  { name: 'Visitors', value: 12500 },
  { name: 'Sign-ups', value: 4200 },
  { name: 'Trials', value: 1800 },
  { name: 'Conversions', value: 420 }
];

export const tableData: TableRowData[] = [
  {
    id: '1',
    source: 'Google Organic',
    users: 4200,
    sessions: 6800,
    revenue: 52000,
    conversionRate: 3.8,
    date: '2024-01-15'
  },
  {
    id: '2',
    source: 'Facebook Ads',
    users: 2800,
    sessions: 4200,
    revenue: 38000,
    conversionRate: 2.9,
    date: '2024-01-14'
  },
  {
    id: '3',
    source: 'Instagram',
    users: 1500,
    sessions: 2100,
    revenue: 18000,
    conversionRate: 4.2,
    date: '2024-01-13'
  },
  {
    id: '4',
    source: 'Email Campaign',
    users: 1200,
    sessions: 1800,
    revenue: 15000,
    conversionRate: 5.1,
    date: '2024-01-12'
  },
  {
    id: '5',
    source: 'LinkedIn Ads',
    users: 950,
    sessions: 1300,
    revenue: 12000,
    conversionRate: 3.5,
    date: '2024-01-11'
  },
  {
    id: '6',
    source: 'YouTube',
    users: 800,
    sessions: 1100,
    revenue: 8000,
    conversionRate: 2.8,
    date: '2024-01-10'
  },
  {
    id: '7',
    source: 'Twitter Ads',
    users: 650,
    sessions: 950,
    revenue: 6500,
    conversionRate: 3.2,
    date: '2024-01-09'
  },
  {
    id: '8',
    source: 'TikTok',
    users: 420,
    sessions: 680,
    revenue: 4200,
    conversionRate: 2.5,
    date: '2024-01-08'
  }
];

// Simulate real-time data updates
export const generateRandomMetric = (): number => {
  return Math.random() * 1000 + 500;
};

export const getRandomTrendData = (): ChartDataPoint[] => {
  const now = new Date();
  const data: ChartDataPoint[] = [];
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    data.push({
      name: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      value: Math.floor(Math.random() * 500) + 200,
      date: time.toISOString()
    });
  }
  
  return data;
};
import { useState, useEffect } from "react";
import { MetricCard } from "@/components/MetricCard";
import { ChartCard } from "@/components/ChartCard";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  metricsData, 
  revenueChartData, 
  userSourceData, 
  conversionFunnelData, 
  tableData,
  getRandomTrendData
} from "@/lib/mockData";
import { Sparkles, BarChart3, Calendar, Download, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [realTimeData, setRealTimeData] = useState(getRandomTrendData());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(getRandomTrendData());
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setRealTimeData(getRandomTrendData());
    setLastUpdated(new Date());
    
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-primary rounded-xl animate-pulse-glow">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  ADmyBRAND Insights
                </h1>
                <p className="text-sm text-muted-foreground">
                  Advanced Analytics Dashboard
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="animate-pulse">
                <Sparkles className="h-3 w-3 mr-1" />
                Live Data
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={cn(
                  "transition-all duration-300",
                  isRefreshing && "animate-spin"
                )}
              >
                <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Last 30 days
              </Button>
              <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 space-y-8">
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricsData.map((metric, index) => (
            <MetricCard key={metric.title} metric={metric} index={index} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Revenue Trend"
            description="Monthly revenue growth over the last 6 months"
            data={revenueChartData}
            type="line"
            index={0}
          />
          
          <ChartCard
            title="Traffic Sources"
            description="User acquisition by source"
            data={userSourceData}
            type="pie"
            index={1}
          />
        </div>

        {/* Additional Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Conversion Funnel"
            description="User journey from visitor to customer"
            data={conversionFunnelData}
            type="bar"
            index={2}
          />
          
          <ChartCard
            title="Real-time Activity"
            description="Live user activity in the last 24 hours"
            data={realTimeData}
            type="line"
            index={3}
          />
        </div>

        {/* Data Table */}
        <DataTable 
          data={tableData}
          title="Traffic Sources Performance"
          description="Detailed breakdown of traffic sources and their performance metrics"
        />

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">
            Last updated: {lastUpdated.toLocaleString()} • 
            <span className="ml-1 text-primary">ADmyBRAND Insights v2.0</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

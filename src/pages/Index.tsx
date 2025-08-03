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
import { Sparkles, BarChart3, Calendar, Download, RefreshCw, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import jsPDF from 'jspdf';

const Index = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [realTimeData, setRealTimeData] = useState(getRandomTrendData());
  const { theme, setTheme } = useTheme();

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

  const handleExportReport = () => {
    const pdf = new jsPDF();
    const date = new Date().toLocaleDateString();
    
    // Header
    pdf.setFontSize(20);
    pdf.setTextColor(59, 130, 246); // Primary blue
    pdf.text('ADmyBRAND Insights Report', 20, 30);
    
    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Generated on: ${date}`, 20, 40);
    
    // Metrics Section
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Key Metrics', 20, 60);
    
    let yPosition = 75;
    metricsData.forEach((metric, index) => {
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`${metric.title}:`, 25, yPosition);
      pdf.setTextColor(59, 130, 246);
      pdf.text(metric.value, 100, yPosition);
      yPosition += 15;
    });
    
    // Traffic Sources Section
    yPosition += 10;
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Traffic Sources Performance', 20, yPosition);
    yPosition += 20;
    
    // Table headers
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text('Source', 25, yPosition);
    pdf.text('Users', 70, yPosition);
    pdf.text('Sessions', 100, yPosition);
    pdf.text('Revenue', 135, yPosition);
    pdf.text('Conv. Rate', 170, yPosition);
    yPosition += 10;
    
    // Table data
    pdf.setTextColor(0, 0, 0);
    tableData.slice(0, 15).forEach((row) => { // Limit to first 15 rows
      if (yPosition > 270) { // New page if needed
        pdf.addPage();
        yPosition = 30;
      }
      pdf.text(row.source, 25, yPosition);
      pdf.text(row.users.toString(), 70, yPosition);
      pdf.text(row.sessions.toString(), 100, yPosition);
      pdf.text(`$${row.revenue.toLocaleString()}`, 135, yPosition);
      pdf.text(`${row.conversionRate}%`, 170, yPosition);
      yPosition += 12;
    });
    
    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text('ADmyBRAND Insights v2.0 - Advanced Analytics Dashboard', 20, 285);
    
    pdf.save(`admybrand-report-${new Date().toISOString().split('T')[0]}.pdf`);
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
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative overflow-hidden group"
              >
                <div className="relative z-10 flex items-center transition-transform duration-300 group-hover:scale-110">
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4 text-amber-500" />
                  ) : (
                    <Moon className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-blue-100 dark:from-slate-800 dark:to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
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
              <Button 
                className="bg-gradient-primary hover:opacity-90 transition-opacity"
                onClick={handleExportReport}
              >
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

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Users, Target } from "lucide-react";
import { MetricData } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  metric: MetricData;
  index: number;
}

const iconMap = {
  DollarSign,
  Users,
  Target,
  TrendingUp
};

export function MetricCard({ metric, index }: MetricCardProps) {
  const Icon = iconMap[metric.icon as keyof typeof iconMap] || TrendingUp;
  const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
  
  return (
    <Card 
      className={cn(
        "relative overflow-hidden bg-gradient-subtle border-0 shadow-elegant hover:shadow-glow transition-all duration-500 animate-fade-in-up group cursor-pointer",
        "hover:scale-105 transform-gpu"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </p>
            <p className="text-3xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent">
              {metric.value}
            </p>
          </div>
          <div className={cn(
            "p-3 rounded-xl transition-colors duration-300",
            "bg-primary/10 group-hover:bg-primary/20"
          )}>
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
        
        <div className="mt-4 flex items-center space-x-2">
          <div className={cn(
            "flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium",
            metric.trend === 'up' 
              ? "bg-success/10 text-success" 
              : "bg-destructive/10 text-destructive"
          )}>
            <TrendIcon className="h-3 w-3" />
            <span>{Math.abs(metric.change)}%</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {metric.changeLabel}
          </p>
        </div>
        
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </CardContent>
    </Card>
  );
}
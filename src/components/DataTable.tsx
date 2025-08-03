import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, ArrowUpDown, Download, Filter } from "lucide-react";
import { TableRowData } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface DataTableProps {
  data: TableRowData[];
  title: string;
  description: string;
}

type SortKey = keyof TableRowData;
type SortOrder = 'asc' | 'desc';

export function DataTable({ data, title, description }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter data based on search term
  const filteredData = data.filter(item =>
    item.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    let aValue = a[sortKey];
    let bValue = b[sortKey];

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = (bValue as string).toLowerCase();
    }

    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getConversionRateBadge = (rate: number) => {
    if (rate >= 4) {
      return <Badge variant="default" className="bg-success/10 text-success hover:bg-success/20">{rate}%</Badge>;
    } else if (rate >= 3) {
      return <Badge variant="secondary">{rate}%</Badge>;
    } else {
      return <Badge variant="destructive" className="bg-destructive/10 text-destructive hover:bg-destructive/20">{rate}%</Badge>;
    }
  };

  return (
    <Card className="bg-gradient-subtle border-0 shadow-elegant hover:shadow-glow transition-all duration-500 animate-fade-in-up">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
              {title}
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-1">
              {description}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="h-9">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mt-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search traffic sources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead 
                  className="cursor-pointer hover:bg-muted/70 transition-colors"
                  onClick={() => handleSort('source')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Traffic Source</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/70 transition-colors text-right"
                  onClick={() => handleSort('users')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Users</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/70 transition-colors text-right"
                  onClick={() => handleSort('sessions')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Sessions</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/70 transition-colors text-right"
                  onClick={() => handleSort('revenue')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Revenue</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/70 transition-colors text-right"
                  onClick={() => handleSort('conversionRate')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Conversion Rate</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/70 transition-colors text-right"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Date</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((row, index) => (
                <TableRow 
                  key={row.id} 
                  className={cn(
                    "hover:bg-muted/20 transition-colors animate-fade-in",
                    index % 2 === 0 ? "bg-background" : "bg-muted/10"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell className="font-medium">{row.source}</TableCell>
                  <TableCell className="text-right">{row.users.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{row.sessions.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(row.revenue)}</TableCell>
                  <TableCell className="text-right">
                    {getConversionRateBadge(row.conversionRate)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatDate(row.date)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} results
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                  className="min-w-[2.5rem]"
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
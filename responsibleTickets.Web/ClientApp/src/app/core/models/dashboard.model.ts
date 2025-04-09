export interface ExpenseSummary {
  totalAmount: number;
  categoryBreakdown: CategoryBreakdown[];
  monthlyTrend: MonthlyTrend[];
}
export interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
}

export interface MonthlyTrend {
  month: string;
  amount: number;
}

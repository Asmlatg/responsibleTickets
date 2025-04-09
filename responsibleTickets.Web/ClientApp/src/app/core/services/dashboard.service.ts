import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExpenseSummary } from '../models/dashboard.model';
import { Expense } from '../models/expense.model';
import { ExpenseService } from './expense.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/api/dashboard`;

  constructor(
    private http: HttpClient,
    private expenseService: ExpenseService
  ) { }

  // In a real application, this would be an API call
  // For demonstration, we'll calculate it client-side from expense data
  getExpenseSummary(startDate: Date, endDate: Date): Observable<ExpenseSummary> {
    return this.expenseService.getExpensesByDateRange(startDate, endDate).pipe(
      map(expenses => this.calculateExpenseSummary(expenses))
    );
  }

  private calculateExpenseSummary(expenses: Expense[]): ExpenseSummary {
    // Calculate total amount
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Calculate category breakdown
    const categoryMap = new Map<string, number>();
    expenses.forEach(expense => {
      const currentAmount = categoryMap.get(expense.category) || 0;
      categoryMap.set(expense.category, currentAmount + expense.amount);
    });

    const categoryBreakdown = Array.from(categoryMap.entries()).map(([category, amount]) => ({
      category,
      amount,
      percentage: (amount / totalAmount) * 100
    }));

    // Calculate monthly trend
    const monthlyMap = new Map<string, number>();
    expenses.forEach(expense => {
      const month = new Date(expense.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      const currentAmount = monthlyMap.get(month) || 0;
      monthlyMap.set(month, currentAmount + expense.amount);
    });

    const monthlyTrend = Array.from(monthlyMap.entries()).map(([month, amount]) => ({
      month,
      amount
    }));

    return {
      totalAmount,
      categoryBreakdown,
      monthlyTrend
    };
  }
}

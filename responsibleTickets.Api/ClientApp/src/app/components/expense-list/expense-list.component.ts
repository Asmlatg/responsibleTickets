import { Component, OnInit } from '@angular/core';
import { ExpenseService, Expense } from '../../services/expense.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.getExpenses();
  }

  getExpenses(): void {
    this.expenseService.getExpenses().subscribe(data => this.expenses = data);
  }

  deleteExpense(id: string): void {
    this.expenseService.deleteExpense(id).subscribe(() => {
      this.expenses = this.expenses.filter(exp => exp.id !== id);
    });
  }
}

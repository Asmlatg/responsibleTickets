import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense, CreateExpenseRequest, UpdateExpenseRequest, ScanReceiptResult } from '../models/expense.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = `${environment.apiUrl}/api/expenses`;

  constructor(private http: HttpClient) { }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl);
  }

  getExpenseById(id: string): Observable<Expense> {
    return this.http.get<Expense>(`${this.apiUrl}/${id}`);
  }

  createExpense(expense: CreateExpenseRequest): Observable<Expense> {
    const formData = this.prepareFormData(expense);
    return this.http.post<Expense>(this.apiUrl, formData);
  }

  updateExpense(expense: UpdateExpenseRequest): Observable<void> {
    const formData = this.prepareFormData(expense);
    return this.http.put<void>(`${this.apiUrl}/${expense.id}`, formData);
  }

  deleteExpense(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  scanReceipt(receiptImage: File): Observable<ScanReceiptResult> {
    const formData = new FormData();
    formData.append('receiptImage', receiptImage);

    return this.http.post<ScanReceiptResult>(`${this.apiUrl}/scan-receipt`, formData);
  }

  getExpensesByDateRange(startDate: Date, endDate: Date): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/by-date-range`, {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      }
    });
  }

  getExpensesByCategory(category: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/by-category`, {
      params: { category }
    });
  }

  private prepareFormData(expense: CreateExpenseRequest | UpdateExpenseRequest): FormData {
    const formData = new FormData();

    // Add all fields to formData
    Object.keys(expense).forEach(key => {
      if (key !== 'receiptImage') {
        formData.append(key, expense[key]);
      }
    });

    // Add receipt image if exists
    if (expense.receiptImage) {
      formData.append('receiptImage', expense.receiptImage);
    }

    return formData;
  }
}

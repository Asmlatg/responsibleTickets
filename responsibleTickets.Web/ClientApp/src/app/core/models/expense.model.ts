export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: Date;
  category: string;
  notes: string;
  receiptImageUrl: string;
}

export interface CreateExpenseRequest {
  title: string;
  amount: number;
  date: Date;
  category: string;
  notes: string;
  receiptImage?: File;
}

export interface UpdateExpenseRequest {
  id: string;
  title: string;
  amount: number;
  date: Date;
  category: string;
  notes: string;
  receiptImage?: File;
}

export interface ScanReceiptResult {
  amount: number;
  date: Date;
  merchant: string;
  category: string;
  items: string[];
  isSuccessful: boolean;
  errorMessage: string;
}

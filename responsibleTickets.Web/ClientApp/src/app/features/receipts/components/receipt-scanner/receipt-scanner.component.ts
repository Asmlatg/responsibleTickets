import { Component, OnInit } from '@angular/core';
import { ReceiptService } from '../../services/receipt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receipt-scanner',
  templateUrl: './receipt-scanner.component.html',
  styleUrls: ['./receipt-scanner.component.scss']
})
export class ReceiptScannerComponent implements OnInit {
  selectedFile: File | null = null;
  isUploading = false;
  previewUrl: string | ArrayBuffer | null = null;
  uploadProgress = 0;
  errorMessage = '';

  constructor(
    private receiptService: ReceiptService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      this.createImagePreview();
    }
  }

  createImagePreview(): void {
    if (!this.selectedFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      this.previewUrl = e.target?.result || null;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  uploadReceipt(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a file first';
      return;
    }

    this.isUploading = true;
    this.uploadProgress = 0;
    this.errorMessage = '';

    this.receiptService.uploadReceipt(this.selectedFile).subscribe({
      next: (receipt) => {
        this.isUploading = false;
        this.uploadProgress = 100;
        this.router.navigate(['/receipts', receipt.id]);
      },
      error: (error) => {
        this.isUploading = false;
        this.errorMessage = 'Failed to upload receipt: ' + error.message;
      }
    });
  }
}

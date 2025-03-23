import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptScannerComponent } from './receipt-scanner.component';

describe('ReceiptScannerComponent', () => {
  let component: ReceiptScannerComponent;
  let fixture: ComponentFixture<ReceiptScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptScannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiptScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

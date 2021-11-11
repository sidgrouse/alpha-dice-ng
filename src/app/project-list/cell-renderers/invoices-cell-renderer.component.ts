import { Component } from '@angular/core';
import { ICellRendererParams, NumberFilter } from 'ag-grid-community';
import { InvoiceDto } from '../../dto/invoice.dto';

@Component({
   selector: 'app-invoices-value-component',
   template: `
         <span *ngIf="invoices.length > 0">
             <button mat-button color="basic"
             (mouseover)="isOpen=true"
             (mouseout)="isOpen=false"
              cdkOverlayOrigin #trigger="cdkOverlayOrigin">{{ total }}</button>
            <ng-template
                cdkConnectedOverlay
                [cdkConnectedOverlayOrigin]="trigger"
                [cdkConnectedOverlayOpen]="isOpen"
                >
                <ul class="invoice-list">
                    <li *ngFor="let inv of invoices">{{inv.amount}} ({{inv.invoiceName}})</li>
                </ul>
            </ng-template>
         </span>
   `,
   styleUrls: ['./invoices-cell-renderer.component.scss']
})
export class InvoicesCellRendererComponent {
    private isOpen: boolean;
    public invoices: InvoiceDto[];
    private total: number;

   // gets called once before the renderer is used
   agInit(params: ICellRendererParams): void {
       this.invoices = params.data.invoices;
       this.total = this.invoices.reduce((p, c) => p + c.amount, 0);
   }

   // gets called whenever the cell refreshes
   refresh(params: ICellRendererParams) {
       this.invoices = params.data.invoices;
       this.total = this.invoices.reduce((p, c) => p + c.amount, 0);
   }
}

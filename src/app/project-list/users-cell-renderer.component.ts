import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
   selector: 'app-user-value-component',
   template: `
         <span *ngIf="users.length > 0">
             <button mat-button color="basic" (click)="buttonClicked()">{{users.length}}</button>
         </span>
   `
})
export class UsersCellRendererComponent {
   private users: string[];

   // gets called once before the renderer is used
   agInit(params: ICellRendererParams): void {
       this.users = params.data.users;
   }

   // gets called whenever the cell refreshes
   refresh(params: ICellRendererParams) {
       this.users = params.data.users;
   }

   buttonClicked() {
       alert(this.users);
   }
}

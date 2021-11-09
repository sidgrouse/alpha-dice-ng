import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
   selector: 'app-user-value-component',
   template: `
         <span *ngIf="users.length > 0">
             <button mat-button color="basic"
             (click)="buttonClicked()" cdkOverlayOrigin #trigger="cdkOverlayOrigin">{{users.length}}</button>
            <ng-template
                cdkConnectedOverlay
                [cdkConnectedOverlayOrigin]="trigger"
                [cdkConnectedOverlayOpen]="isOpen"
                >
                <ul class="example-list">
                    <li *ngFor="let user of users">{{user}}</li>
                </ul>
            </ng-template>
         </span>
   `,
   styleUrls: ['./users-cell-renderer.component.scss']
})
export class UsersCellRendererComponent {
    private isOpen: boolean;
   public users: string[];

   // gets called once before the renderer is used
   agInit(params: ICellRendererParams): void {
       this.users = params.data.users;
   }

   // gets called whenever the cell refreshes
   refresh(params: ICellRendererParams) {
       this.users = params.data.users;
   }

   buttonClicked() {
       // alert(this.users);
       this.isOpen = !this.isOpen;
   }
}

import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
   selector: 'app-link-value-component',
   template: `
         <span><a href="{{ link }}">#</a> {{ name }}</span>
   `
})
export class LinkCellRendererComponent {
   public link: string;
   public name: string;

   // gets called once before the renderer is used
   agInit(params: ICellRendererParams): void {
       this.link = params.data.url;
       this.name = params.data.projectName;
   }

   // gets called whenever the cell refreshes
   refresh(params: ICellRendererParams) {
       this.link = params.data.url;
   }

   buttonClicked() {
       // alert(this.users);
   }
}

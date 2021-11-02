import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  columnDefs: ColDef[] = [
    { field: 'id' },
    { field: 'name' },
    { field: 'status'}
];

rowData: Observable<any[]>;

constructor(private http: HttpClient) {
    this.rowData = this.http.get<any[]>('http://80.85.158.236:3001/project');
    console.log(this.rowData);
}
}

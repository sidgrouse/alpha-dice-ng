import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CellValueChangedEvent, ColDef, SelectionChangedEvent } from 'ag-grid-community';
import { environment } from 'src/environments/environment';
import { ProjectDto } from '../dto/project.dto';
import { OrderDetails } from '../viewModels/order-details';
import { UsersCellRendererComponent } from './users-cell-renderer.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  public frameworkComponents;
  columnDefs: ColDef[] = [
    { headerName: 'Проект', field: 'projectName', filter: 'agTextColumnFilter' },
    { field: 'status', editable: true, cellEditor: 'agSelectCellEditor'},
    { field: 'itemName', editable: true },
    { field: 'details', editable: true },
    { field: 'originalPrice'},
    { headerName: 'Вписались', cellRenderer: 'usersCellRenderer' },

  ];

  projects: OrderDetails[];

  constructor(private http: HttpClient) {
    this.frameworkComponents = {
      usersCellRenderer: UsersCellRendererComponent
    };
    this.refreshData();
  }

  public onCellValueChanged(event: CellValueChangedEvent) {
    const editedItm: OrderDetails = event.data;
    console.log(editedItm);
    const patch = { [event.colDef.field]: event.newValue };

    this.http.patch(`${environment.apiEndpoint}/project/${editedItm.projectId}`, patch)
      .subscribe(_ => this.refreshData());
  }

  private refreshData() {
    this.http.get<ProjectDto[]>(`${environment.apiEndpoint}/project`)
        .subscribe(result => {
          // tslint:disable-next-line: max-line-length
          this.projects = result.flatMap(p => p.items.flatMap(itm => new OrderDetails(itm.id, p.id, p.name, itm.name, p.status, p.url, p.details, itm.originalPrice, itm.userOrders)));
          console.log(this.projects);
        });
  }
}

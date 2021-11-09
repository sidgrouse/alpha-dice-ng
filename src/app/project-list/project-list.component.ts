import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CellValueChangedEvent, ColDef, SelectionChangedEvent } from 'ag-grid-community';
import { environment } from 'src/environments/environment';
import { ProjectStatus } from '../constants/project-status';
import { ProjectDto } from '../dto/project.dto';
import { OrderDetails } from '../viewModels/order-details';
import { UsersCellRendererComponent } from './users-cell-renderer.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  public searchPattern: string;
  public frameworkComponents;
  private gridApi;
  columnDefs: ColDef[] = [
    { headerName: 'Проект', field: 'projectName'},
    { headerName: 'Статус', field: 'status', editable: true, cellEditor: 'agSelectCellEditor',
      cellEditorParams: {values: Object.values(ProjectStatus), }, },
    { headerName: 'Наименование', field: 'itemName' }, // TODO: editable
    { headerName: 'Цена для всех', field: 'itemOriginalPrice'},
    // tslint:disable-next-line: max-line-length
    { headerName: 'Вписались', cellRenderer: 'usersCellRenderer', getQuickFilterText: params => params.data.users },
    { headerName: 'Комментарий', field: 'details', editable: true, resizable: true },

  ];

  projects: OrderDetails[];

  constructor(private http: HttpClient) {
    this.frameworkComponents = {
      usersCellRenderer: UsersCellRendererComponent
    };
    this.refreshData();
  }

  public onGridReady = (params) => {
    this.gridApi = params.api;
  }

  public onCellValueChanged(event: CellValueChangedEvent) {
    const editedItm: OrderDetails = event.data;
    const isItemEntity = event.colDef.field.startsWith('item');
    const fieldName = isItemEntity ? event.colDef.field.substr('item'.length) : event.colDef.field;
    const patch = { [fieldName]: event.newValue };
    const entitySegment = isItemEntity ? 'item' : 'project';
    this.http.patch(`${environment.apiEndpoint}/${entitySegment}/${editedItm.projectId}`, patch)
      .subscribe(_ => this.refreshData());
  }

  public onFulterChange(newValue) {
    this.gridApi.setQuickFilter(newValue);
  }

  private refreshData() {
    this.http.get<ProjectDto[]>(`${environment.apiEndpoint}/project`)
        .subscribe(result => {
          // tslint:disable-next-line: max-line-length
          this.projects = result.flatMap(p => p.items.flatMap(itm => new OrderDetails(itm.id, p.id, p.name, itm.name, p.status, p.url, p.details, itm.originalPrice, itm.userOrders)));
        });
  }
}

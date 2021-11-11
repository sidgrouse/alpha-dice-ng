import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { CellValueChangedEvent, ColDef, SelectionChangedEvent } from 'ag-grid-community';
import { environment } from 'src/environments/environment';
import { ProjectStatus } from '../constants/project-status';
import { ProjectDto } from '../dto/project.dto';
import { OrderDetails } from '../viewModels/order-details';
import { InvoicesCellRendererComponent } from './cell-renderers/invoices-cell-renderer.component';
import { LinkCellRendererComponent } from './cell-renderers/link-cell-renderer.component';
import { UsersCellRendererComponent } from './cell-renderers/users-cell-renderer.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  public searchPattern: string;
  public frameworkComponents;
  private gridApi;
  private gridColumnApi;

  defaultColDef = { resizable: true};
  columnDefs: ColDef[] = [
    { headerName: 'Проект', cellRenderer: 'linkCellRenderer'},
    { headerName: 'Статус', field: 'status', editable: true, cellEditor: 'agSelectCellEditor',
        cellEditorParams: {values: Object.values(ProjectStatus), }, },
    { headerName: 'Наименование', field: 'item_name', editable: true },
    { headerName: 'Цена для всех', field: 'item_originalPrice', editable: true },
    { headerName: 'Цена для нас', field: 'item_discountPrice', editable: true },
    // tslint:disable-next-line: max-line-length
    { headerName: 'Вписались', cellRenderer: 'usersCellRenderer', getQuickFilterText: params => params.data.users },
    { headerName: 'Сумма инвойсов', cellRenderer: 'invoicesCellRenderer' },
    { headerName: 'Комментарий', field: 'details', editable: true, resizable: true },

  ];

  projects: OrderDetails[];

  constructor(private http: HttpClient) {
    this.frameworkComponents = {
      usersCellRenderer: UsersCellRendererComponent,
      linkCellRenderer: LinkCellRendererComponent,
      invoicesCellRenderer: InvoicesCellRendererComponent,
    };
    this.refreshData();
  }

  public onGridReady = (params) => {
    console.log('p', params);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  public onFirstDataRendered = () => {
    this.autoSizeAll(false);
  }

  public onCellValueChanged(event: CellValueChangedEvent) {
    const editedItm: OrderDetails = event.data;
    const isItemEntity = event.colDef.field.startsWith('item_');
    const fieldName = isItemEntity ? event.colDef.field.substr('item_'.length) : event.colDef.field;
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
          console.log('=', result);
          // tslint:disable-next-line: max-line-length
          this.projects = result.flatMap(p => p.items.flatMap(itm => new OrderDetails(itm.id, p.id, p.name, itm.name, p.status, p.url, p.details, itm.originalPrice, itm.discountPrice, itm.userOrders, itm.invoices)));
        });
  }

  autoSizeAll(skipHeader: boolean) {
    const allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(column => {
      allColumnIds.push(column.colId);
    });
    console.log('--', allColumnIds);
    this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  }
}

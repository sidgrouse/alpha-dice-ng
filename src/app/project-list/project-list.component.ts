import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CellValueChangedEvent, ColDef } from 'ag-grid-community';
import { ProjectDto } from '../dto/project.dto';
import { ProjectItem } from '../viewModels/project-item';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  columnDefs: ColDef[] = [
    { field: 'projectName', editable: true, filter: 'agTextColumnFilter' },
    { field: 'status', editable: true},
    { field: 'itemName'},
    { field: 'details', editable: true }

  ];

  projects: ProjectItem[];

  constructor(private http: HttpClient) {
      this.refreshData();
  }

  public onCellValueChanged(event: CellValueChangedEvent) {
    const editedItm: ProjectItem = event.data;
    console.log(editedItm);
    const patch = { [event.colDef.field]: event.newValue };

    this.http.patch(`http://localhost:3001/project/${editedItm.projectId}`, patch)
      .subscribe(_ => this.refreshData());
  }

  private refreshData() {
    this.http.get<ProjectDto[]>('http://localhost:3001/project') // 'http://80.85.158.236:3001/project'
        .subscribe(result => {
          // tslint:disable-next-line: max-line-length
          this.projects = result.flatMap(p => p.items.map(itm => new ProjectItem(itm.id, p.id, p.name, itm.name, p.status, p.url, p.details)));
          console.log(this.projects);
        });
  }
}

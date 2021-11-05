import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProjectDto } from '../dto/project.dto';
import { ProjectItem } from './data';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  displayedColumns = ['id', 'projectName', 'itemName', 'status', 'details'];

  dataSource = [];

  groupingColumn;

  reducedGroups = [];

  initialData: any [];

  constructor(private http: HttpClient) {
    let initData: ProjectItem[];
    http.get<ProjectDto[]>('http://80.85.158.236:3001/project')
      .subscribe(res  => {
        console.log(res);
        initData = res.flatMap(p => p.items.map(itm => new ProjectItem(itm.id, p.name, itm.name, p.status, p.url, p.details)));

        if (!this.initData(initData)) {
          return;
       }

        this.buildDataSource();
      });
  }

  /**
   * Discovers columns in the data
   */
  initData(data) {
    if (!data) {
      return false;
    }
    this.initialData = data;
    return true;
  }

  /**
   * Rebuilds the datasource after any change to the criterions
   */
  buildDataSource() {
    this.dataSource = this.groupBy(this.groupingColumn, this.initialData, this.reducedGroups);
  }

  /**
   * Groups the @param data by distinct values of a @param column
   * This adds group lines to the dataSource
   * @param reducedGroups is used localy to keep track of the colapsed groups
   */
  groupBy(column: string, data: any[], reducedGroups?: any[]) {
    if (!column) {
      return data;
    }
    let collapsedGroups = reducedGroups;
    if (!reducedGroups) {
      collapsedGroups = [];
    }
    const customReducer = (accumulator, currentValue) => {
      const currentGroup = currentValue[column];
      if (!accumulator[currentGroup]) {
      accumulator[currentGroup] = [{
        groupName: `${currentValue[column]}`,
        value: currentValue[column],
        isGroup: true,
        reduced: collapsedGroups.some((group) => group.value === currentValue[column])
      }];
    }
      accumulator[currentGroup].push(currentValue);

      return accumulator;
    };
    const groups = data.reduce(customReducer, {});
    const groupArray = Object.keys(groups).map(key => groups[key]);
    const flatList = groupArray.reduce((a, c) => a.concat(c), []);

    return flatList.filter((rawLine) => {
        return rawLine.isGroup ||
        collapsedGroups.every((group) => rawLine[column] !== group.value);
      });
  }

  /**
   * Since groups are on the same level as the data,
   * this function is used by @input(matRowDefWhen)
   */
  isGroup(index, item): boolean {
    return item.isGroup;
  }

  /**
   * Used in the view to collapse a group
   * Effectively removing it from the displayed datasource
   */
  reduceGroup(row) {
    row.reduced = !row.reduced;
    if (row.reduced) {
      this.reducedGroups.push(row);
    } else {
      this.reducedGroups = this.reducedGroups.filter((el) => el.value !== row.value);
    }
    this.buildDataSource();
  }
}

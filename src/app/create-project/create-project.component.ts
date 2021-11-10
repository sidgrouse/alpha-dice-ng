import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AddProjectDto } from '../dto/project.add.dto';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent {
  project: AddProjectDto = new AddProjectDto();

  constructor(private http: HttpClient) {}

  async post() {
    console.log(this.project);
    // await this.http.post(environment.apiEndpoint + '/project', this.project).subscribe({error: e => console.error(e)});
  }
}

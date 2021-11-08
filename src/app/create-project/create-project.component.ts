import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateProjectDto } from '../dto/create-project.dto';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent {
  project: CreateProjectDto = new CreateProjectDto();

  constructor(private http: HttpClient) {}

  async post() {
    console.log(this.project);
    // await this.http.post(environment.apiEndpoint + '/project', this.project).subscribe({error: e => console.error(e)});
  }
}

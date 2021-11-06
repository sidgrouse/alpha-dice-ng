import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CreateProjectDto } from '../dto/create-project.dto';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent {
  project: CreateProjectDto = new CreateProjectDto();

  constructor(private http: HttpClient) {}

  post() {
    console.log(this.project);
    //// await this.http.post('http://localhost:3001/project', this.project).subscribe({error: e => console.error(e)});
  }
}

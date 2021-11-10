import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectListComponent } from './project-list/project-list.component';

const routes: Routes = [
  { path: 'project-list', component: ProjectListComponent },
  { path: 'add-project', component: CreateProjectComponent },
  { path: '', redirectTo: '/project-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

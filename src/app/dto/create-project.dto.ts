import { ProjectStatus } from '../constants/project-status';

export class CreateProjectDto {
  public name: string;
  public status: ProjectStatus;
  public url: string;
  public details: string;
}

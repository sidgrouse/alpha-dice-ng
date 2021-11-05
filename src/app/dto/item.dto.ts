import { ProjectStatus } from '../constants/project-status';

export class ItemDto {
  constructor(
    public id: number,
    public name: string,
    public projectName: string,
    public projectStatus: ProjectStatus,
  ) {}
}

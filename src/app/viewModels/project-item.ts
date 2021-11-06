export class ProjectItem {
  constructor(
    public itemId: number,
    public projectId: number,
    public projectName: string,
    public itemName: string,
    public status: string,
    public url: string,
    public details: string) {}
}

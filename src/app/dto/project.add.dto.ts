import { AddItemDto } from './item.add.dto';

export class AddProjectDto {
    public name: string;
    public url: string;
    public details: string;
    public items: AddItemDto[];
}

import { uuidv4 } from '../../utils/functions';

export class View {
    id?: string;
    favorite: boolean;
    name: string;
    access: 'private' | 'public' = 'public';
    readonly: boolean;
    autoApply: boolean;
    default: boolean;
    createdBy: string;
    settings?: any;

    constructor() {
        this.id = uuidv4();
    }
}

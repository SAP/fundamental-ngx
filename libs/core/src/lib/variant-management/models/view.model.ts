import { uuidv4 } from '../../utils/functions';

export class View {
    id?: string;
    name: string;
    createdBy: string;
    settings?: any;

    readonly?: boolean;
    favorite = false;
    access: 'private' | 'public' = 'public';
    // autoApply = false;
    default = false;

    constructor() {
        this.id = uuidv4();
    }
}

import { uuidv4 } from '../../utils/functions';


export type ViewAccess = 'private' | 'public';
export class View {
    id?: string;
    name: string;
    createdBy: string;
    settings?: any;

    readonly?: boolean;
    favorite = false;
    access: ViewAccess = 'public';
    default = false;

    constructor() {
        this.id = uuidv4();
    }
}

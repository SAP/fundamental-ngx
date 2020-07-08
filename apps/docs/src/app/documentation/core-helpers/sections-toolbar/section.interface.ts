export interface SectionInterface {
    header: string;
    content: {
        url: string;
        name: string;
        subItems?: {
            url: string;
            name: string;
        }[];
    }[];
}

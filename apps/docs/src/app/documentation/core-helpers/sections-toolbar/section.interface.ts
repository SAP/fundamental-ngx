export interface SectionInterface {
    header: string;
    content: SectionInterfaceContent[];
}

export type SectionInterfaceContent = SectionInterfaceContentLinear | SectionInterfaceContentNested;

interface SectionInterfaceContentLinear {
    name: string;
    url: string;
}
interface SectionInterfaceContentNested {
    name: string;
    subItems: {
        url: string;
        name: string;
    }[];
}

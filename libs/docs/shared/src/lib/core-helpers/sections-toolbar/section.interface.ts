export interface SectionInterface {
    header: string;
    content: SectionInterfaceContent[];
}

export type SectionInterfaceContent = SectionInterfaceContentLinear | SectionInterfaceContentNested;

export interface SectionInterfaceContentLinear {
    name: string;
    url: string;
}
export interface SectionInterfaceContentNested {
    name: string;
    subItems: SectionInterfaceContentLinear[];
}

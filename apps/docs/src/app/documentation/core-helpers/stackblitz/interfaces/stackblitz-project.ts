export interface StackblitzProject {
    files: Record<string, any>;
    title: string;
    description: string;
    template: string;
    tags: string[];
    dependencies: Record<string, any>;
}

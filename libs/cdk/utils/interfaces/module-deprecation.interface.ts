export interface ModuleDeprecation {
    alternative: { name: string; link: string | string[]; fragment?: string };
    message: string;
}

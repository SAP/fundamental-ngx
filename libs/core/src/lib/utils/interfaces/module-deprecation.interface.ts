export interface ModuleDeprecation {
    alternative: { name: string; link: string | string[] };
    message: string;
}

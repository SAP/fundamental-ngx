export interface Schema {
    /** Name of the project to target. */
    project: string;

    /** Root path to the selected project  - a place where template files will be copied */
    path: string;

    /**
     * Works with specific module within the project
     */
    module: string;

    standalone: boolean;

    hasModuleFederation: boolean;

    addModuleAnimation: boolean;


    addAppShellModule: boolean;
}

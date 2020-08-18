export interface Schema {
    /** Name of the project to target. */
    project: string;

    /** Root path to the selected project  - a place where template files will be copied */
    path: string;

    /**
     * Works with specific module within the project
     */
    moduleName: string;

    /** Dont add package.json dependencies. */
    skipDependencies: boolean;

    /** Dont run npm install. */
    skipNpmInstall: boolean;


    /** Dont add anything to angular.json script section. */
    skipScripts: boolean;


    /** Dont add anything to angular.json style section. */
    skipStyles: boolean;
}

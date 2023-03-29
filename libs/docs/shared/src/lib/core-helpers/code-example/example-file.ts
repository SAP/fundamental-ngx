import { Observable } from 'rxjs';

export interface ExampleFile<
    ProvidedCodeType = string | Observable<string>,
    ProvidedScssCodeType = string | Observable<string>,
    ProvidedTsCodeType = string | Observable<string>
> {
    code: ProvidedCodeType;
    scssFileCode?: ProvidedScssCodeType;
    standalone?: boolean;
    pure?: boolean;
    language: string;
    fileName?: string;
    entryComponent?: boolean;
    component?: string;
    main?: boolean;
    name?: string;
    typescriptFileCode?: ProvidedTsCodeType;
    service?: boolean;
    pipe?: boolean;
    path?: string;
}

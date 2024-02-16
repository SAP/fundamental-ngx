import { Observable } from 'rxjs';

export interface ExampleFile<
    ProvidedCodeType = string | Observable<string>,
    ProvidedScssCodeType = string | Observable<string>,
    ProvidedTsCodeType = string | Observable<string>
> {
    code: ProvidedCodeType;
    scssFileCode?: ProvidedScssCodeType;
    scssFileName?: string;
    standalone?: boolean;
    pure?: boolean;
    directive?: boolean;
    language: string;
    fileName?: string;
    selector?: string;
    entryComponent?: boolean;
    component?: string;
    main?: boolean;
    name?: string;
    typescriptFileCode?: ProvidedTsCodeType;
    service?: boolean;
    pipe?: boolean;
    path?: string;
}

/** The UI5 CEM fields used by wrapper generation, without depending on its build and test tooling. */
export interface Package {
    schemaVersion: string;
    modules: JavaScriptModule[];
}

export interface JavaScriptModule {
    kind: 'javascript-module';
    path: string;
    declarations?: Declaration[];
}

export interface Declaration {
    kind: string;
    name: string;
    tagName?: string;
    customElement?: boolean;
    members?: ClassMember[];
    events?: Event[];
    slots?: Slot[];
}

export interface ClassDeclaration extends Declaration {
    kind: 'class';
}

export interface CustomElementDeclaration extends ClassDeclaration {
    customElement: true;
}

export interface EnumDeclaration extends Declaration {
    kind: 'enum';
}

export type ClassMember = ClassField | ClassMethod;

export interface ClassField {
    kind: 'field';
    name: string;
    privacy?: string;
    readonly?: boolean;
    static?: boolean;
    description?: string;
    default?: string;
    type?: Type;
    _ui5formProperty?: boolean;
    _ui5formEvents?: string;
}

export interface ClassMethod {
    kind: 'method';
    name: string;
    privacy?: string;
}

export interface Type {
    text: string;
    references?: TypeReference[];
}

export interface TypeReference {
    name: string;
    package?: string;
    module?: string;
}

export interface Event {
    name: string;
    description?: string;
    type?: Type;
    _ui5privacy?: string;
    _ui5parameters?: { name: string; type?: Type; _ui5privacy?: string }[];
}

export interface Slot {
    name: string;
    description?: string;
    _ui5since?: string;
}

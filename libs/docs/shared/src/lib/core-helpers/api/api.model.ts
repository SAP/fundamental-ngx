export interface ApiModel {
    name: string;
    selector: string | null;
    kind: 'Component' | 'Directive' | 'Service' | 'Pipe' | 'Module' | 'Class';
    sourceFile: string;
    sourceLine: number;
    sourceUrl: string;
    description: string;
    inputs: ApiMember[];
    outputs: ApiMember[];
    methods: ApiMethod[];
    inherited: ApiInherited | null;
}

export interface ApiMember {
    name: string;
    type: string;
    default: string | null;
    description: string;
    isSignal: boolean;
    deprecated: string | null;
    sourceLine: number;
    since: string | null;
}

export interface ApiMethod {
    name: string;
    signature: string;
    description: string;
    deprecated: string | null;
    sourceLine: number;
    since: string | null;
    parameters: ApiMethodParam[];
    returnType: string;
}

export interface ApiMethodParam {
    name: string;
    type: string;
    description: string;
    optional: boolean;
}

export interface ApiInherited {
    from: string;
    inputs: ApiMember[];
    methods: ApiMethod[];
}

export type ApiMemberCategory = 'all' | 'inputs' | 'outputs' | 'methods';

export type SortDirection = 'asc' | 'desc' | null;

export interface UnifiedApiMember {
    name: string;
    kind: 'input' | 'output' | 'method';
    type: string;
    default: string | null;
    description: string;
    isSignal: boolean;
    deprecated: string | null;
    sourceLine: number;
    since: string | null;
    parameters?: ApiMethodParam[];
    returnType?: string;
}

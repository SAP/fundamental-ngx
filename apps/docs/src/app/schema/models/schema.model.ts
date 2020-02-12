export interface Schema {
    type: string;
    properties: Properties;
    required?: string[];
    modifier?: Properties;
    state?: Properties;
    aria?: Properties;
}

export interface Properties {
    [name: string]: Property;
}

export interface Property {
    id?: string;
    type: string;
    items?: Property;
    enum?: any[];
    properties?: Properties;
}

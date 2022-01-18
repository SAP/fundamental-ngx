import { Inject, Injectable } from '@angular/core';
import { Properties, Schema } from '../../models/schema.model';

@Injectable()
export class SchemaFactoryService {
    schemasMap: Map<string, Schema> = new Map<string, Schema>();

    constructor(@Inject('SCHEMAS') private readonly SCHEMAS: { [name: string]: Schema }) {}

    getComponent(name: string): Schema {
        if (!this.schemasMap.has(name)) {
            this.schemasMap.set(name, {
                ...this.SCHEMAS[name],
                properties: this._buildSchema({ ...this.SCHEMAS[name].properties })
            });
        }
        return this.schemasMap.get(name);
    }

    private _buildSchema(properties: Properties): Properties {
        for (const key in properties) {
            if (Object.prototype.hasOwnProperty.call(properties, key)) {
                const type = properties[key].type;
                if (this.SCHEMAS[type]) {
                    properties[key]['type'] = 'object';
                    properties[key]['properties'] = this._buildSchema({ ...this.SCHEMAS[type].properties });
                }
            }
        }
        return properties;
    }
}

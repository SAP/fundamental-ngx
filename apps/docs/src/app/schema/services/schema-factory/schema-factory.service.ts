import { Inject, Injectable } from '@angular/core';
import { Schemas, SCHEMAS } from '../../consts/schemas';
import { Properties, Schema } from '../../models/schema.model';

@Injectable()
export class SchemaFactoryService {
    schemasMap: Map<string, Schema> = new Map<string, Schema>();

    constructor(@Inject(SCHEMAS) private readonly schemas: Schemas) {}

    getComponent(name: string): Schema {
        if (!this.schemasMap.has(name)) {
            this.schemasMap.set(name, {
                ...this.schemas[name],
                properties: this._buildSchema({ ...this.schemas[name].properties })
            });
        }
        return this.schemasMap.get(name);
    }

    private _buildSchema(properties: Properties): Properties {
        for (const key in properties) {
            if (Object.prototype.hasOwnProperty.call(properties, key)) {
                const type = properties[key].type;
                if (this.schemas[type]) {
                    properties[key]['type'] = 'object';
                    properties[key]['properties'] = this._buildSchema({ ...this.schemas[type].properties });
                }
            }
        }
        return properties;
    }
}

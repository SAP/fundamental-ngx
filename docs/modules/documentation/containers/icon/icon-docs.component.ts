import { Component, OnInit } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import { AppConstants } from '../../AppConstants';

@Component({
    selector: 'app-icon',
    templateUrl: './icon-docs.component.html',
    styleUrls: ['./icon-docs.component.scss']
})
export class IconDocsComponent implements OnInit {
    icons: any = AppConstants.SAPIcons;
    AribaIcons: any = AppConstants.AribaIcons;

    static glyphGroups = ['sap | ariba'];
    static schema: any = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    glyphs: {
                        type: 'string',
                        enum: AppConstants.SAPIcons
                    },
                    glyphGroup: {
                      type: 'string',
                      enum: IconDocsComponent.glyphGroups
                    }
                }
            },
            modifier: {
                type: 'object',
                properties: {
                    block: {
                        type: 'string',
                        enum: AppConstants.componentSizes
                    }
                }
            }
        },
        type: 'object'
    };

    schema: Schema;

    data: any = {
        properties: {
            glyphs: AppConstants.SAPIcons[0],
            glyphGroup: IconDocsComponent.glyphGroups[0]
        },
        modifier: {
            block: AppConstants.componentSizes[1]
        }
    };

    iconHtml = `<div class="grid">
  <div *ngFor="let icon of icons">
    <fd-icon [glyph]="icon" [size]="'l'" glyphGroup="sap"></fd-icon>
    <span>{{ icon }}</span>
  </div>
</div>`;

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('icon');
    }

    onSchemaValues(data) {
        this.data = data;
    }

    ngOnInit() {}
}

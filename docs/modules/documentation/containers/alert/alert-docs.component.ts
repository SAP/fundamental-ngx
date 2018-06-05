import { Component, OnInit } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';
@Component({
    selector: 'app-alert',
    templateUrl: './alert-docs.component.html'
})
export class AlertDocsComponent {
    static schema: Schema = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    dismissible: {
                        type: 'boolean'
                    }
                }
            },
            modifier: {
                type: 'object',
                properties: {
                    block: {
                        type: 'string',
                        enum: ['', 'warning', 'error']
                    }
                }
            }
        },
        type: 'object'
    };

    schema: Schema;

    data: any = {
        properties: {
            dismissible: true
        },
        modifier: {
            block: 'error'
        }
    };

    message: String = 'This is an ';

    alertHtml =
        '    <p>\n' +
        '      <fd-alert [dismissible]="true" type="warning" (close)="showAlert($event)">\n' +
        '        A dismissible warning type alert.\n' +
        '      </fd-alert>\n' +
        '    </p>\n' +
        '    <p>\n' +
        '      <fd-alert [dismissible]="true" type="error" (close)="showAlert($event)">\n' +
        '        <div>\n' +
        '          <h3>A dismissible error type alert with template.</h3>\n' +
        '          <p>More information...</p>\n' +
        '        </div>\n' +
        '      </fd-alert>\n' +
        '    </p>\n' +
        '    <p>\n' +
        '      <fd-alert [dismissible]="false">\n' +
        '        A normal type alert.\n' +
        '      </fd-alert>\n' +
        '    </p>\n' +
        '    <p>\n' +
        '      <fd-alert [dismissible]="false">\n' +
        '        An alert with a <a href="#" class="fd-link">link <fd-icon [glyph]="\'arrow-right\'" [size]="\'s\'"></fd-icon></a>\n' +
        '      </fd-alert>\n' +
        '    </p>';

    preview = `
    <fd-alert block='error' dismissible='true'>
      This is one error
    </fd-alert>
  `;

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('alert');
    }

    onSchemaValues(data) {
        this.data = data;
    }

    showAlert(id: string) {
        alert(`Alert with id ${id} has triggered a close event!`);
    }
}

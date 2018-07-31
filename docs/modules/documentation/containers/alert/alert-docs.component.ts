import { Component, OnInit } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';
@Component({
    selector: 'app-alert',
    templateUrl: './alert-docs.component.html'
})
export class AlertDocsComponent {
    static schema: any = {
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
                        enum: ['default', 'warning', 'error']
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
            block: 'default'
        }
    };

    messagePart1: String = 'This is the ';
    messagePart2: String = ' alert style.';

    alertHtml = `<p>
  <fd-alert [dismissible]="true" [type]="'warning'" (close)="showAlert($event)">
    A dismissible warning type alert.
  </fd-alert>
</p>
<p>
  <fd-alert [dismissible]="true" [type]="'error'" (close)="showAlert($event)">
    <div>
      <h3>A dismissible error type alert with template.</h3>
      <p>More information...</p>
    </div>
  </fd-alert>
</p>
<p>
  <fd-alert [dismissible]="false">
    A normal type alert.
  </fd-alert>
</p>
<p>
  <fd-alert [dismissible]="false">
    An alert with a <a href="#" class="fd-link">link <fd-icon [glyph]="'arrow-right'" [size]="'s'"></fd-icon></a>
  </fd-alert>
</p>`;

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

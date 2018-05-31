import { Component, OnInit } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

@Component({
  selector: 'app-inline-help',
  templateUrl: './inline-help.component.html'
})
export class InlineHelpComponent implements OnInit {

  static schema: Schema = {
    properties: {
      properties: {
        type: 'object',
        properties: {
          'label': {
            type: 'string'
          },
          'helpText': {
            type: 'string'
          },
          'position': {
            type: 'string',
            enum: ['default', 'bottom-left', 'right', 'left']
          }
        }
      }
    },
    type: 'object'
  };

  schema: Schema;

  data: any = {
    properties: {
      label: 'Inline Help',
      helpText: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
      position: 'default'
    }
  };

  defaultPositionHtml =
    'Bottom Right (Default)\n' +
    '\n' +
    '<fd-inline-help>\n' +
    '   Lorem ipsum dolor sit amet, consectetur adipiscing.\n' +
    '</fd-inline-help>\n';

  buttomLeftPositionHtml =
    'Bottom Left\n' +
    '\n' +
    '<fd-inline-help [position]="\'bottom-left\'">\n' +
    '   Lorem ipsum dolor sit amet, consectetur adipiscing.\n' +
    '</fd-inline-help>\n';

  rightPositionHtml =
    'Right\n' +
    '\n' +
    '<fd-inline-help [position]="\'right\'">\n' +
    '   Lorem ipsum dolor sit amet, consectetur adipiscing.\n' +
    '</fd-inline-help>\n' ;

  leftPositionHtml =
    'Left\n' +
    '\n' +
    '<fd-inline-help [position]="\'left\'">\n' +
    '   Lorem ipsum dolor sit amet, consectetur adipiscing.\n' +
    '</fd-inline-help>\n' ;

  constructor(private schemaFactory: SchemaFactoryService) {
    this.schema = this.schemaFactory.getComponent('inlineHelp');
  }

  onSchemaValues(data) {
    this.data = data;
  }

  ngOnInit() {

  }
}




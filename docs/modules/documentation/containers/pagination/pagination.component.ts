import { Component } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {
  static schema: Schema = {
    properties: {
      properties: {
        type: 'object',
        properties: {
          totalItems: {
            type: 'integer'
          },
          itemsPerPage: {
            type: 'integer'
          },
          currentPage: {
            type: 'integer'
          }
        }
      }
    },
    type: 'object'
  };

  schema: Schema;

  data: any = {
    properties: {
      totalItems: 70,
      itemsPerPage: 2,
      currentPage: 5
    }
  };

  paginationHtml =
    '<fd-pagination [class]="\'fd-demo-pagination\'" ' +
    '[pagination]="{totalItems: totalItems, itemsPerPage:  itemsPerPage, currentPage: currentPage}">' +
    '</fd-pagination>';

  constructor(private schemaFactory: SchemaFactoryService) {
    this.schema = this.schemaFactory.getComponent('pagination');
  }

  onSchemaValues(data) {
    this.data = data;
  }
}

import { Component, OnInit } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html'
})
export class ImageComponent implements OnInit {

  static schema: Schema = {
    properties: {
      properties: {
        type: 'object',
        properties: {
          'size': {
            type: 'string',
            enum: ['s', 'm', 'l']
          },
          'photo': {
            type: 'string'
          },
          'isCircle': {
            type: 'boolean'
          },
        }
      }
    },
    type: 'object'
  };

  schema: Schema;

  data: any = {
    properties: {
      size: 'l',
      photo: 'https://placeimg.com/400/400/nature',
      isCircle: false
    }
  };

  imageSizesHtml = 
    '<fd-image [size]="\'s\'" [photo]="\'https://placeimg.com/400/400/nature\'"></fd-image>\n' +
    '<fd-image [size]="\'m\'" [photo]="\'https://placeimg.com/400/400/nature\'"></fd-image>\n' +
    '<fd-image [size]="\'l\'" [photo]="\'https://placeimg.com/400/400/nature\'"></fd-image>\n' ;

  imageShapesHtml = 
  '<fd-image [size]="\'s\'" [circle]="true" [photo]="\'https://placeimg.com/400/400/nature\'"></fd-image>\n' +
  '<fd-image [size]="\'m\'" [circle]="true" [photo]="\'https://placeimg.com/400/400/nature\'"></fd-image>\n' +
  '<fd-image [size]="\'l\'" [circle]="true" [photo]="\'https://placeimg.com/400/400/nature\'"></fd-image>\n' ;


  constructor(private schemaFactory: SchemaFactoryService) {
    this.schema = this.schemaFactory.getComponent('image');
  }

  onSchemaValues(data) {
    this.data = data;
  }

  ngOnInit() {

  }

}



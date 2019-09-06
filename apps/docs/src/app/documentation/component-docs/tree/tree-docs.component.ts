import { Component } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

@Component({
    selector: 'app-tree',
    templateUrl: './tree-docs.component.html'
})
export class TreeDocsComponent {
    static schema: Schema = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    headers: {
                        type: 'string[]'
                    },
                    treeData: {
                        type: 'TreeRowObject[]'
                    }
                }
            },
            state: {
                type: 'object',
                properties: {
                    disabled: {
                        type: 'boolean'
                    }
                }
            }
        },
        type: 'object'
    };

    schema: Schema;
    data: any = {
        properties: {
            headers: ['Column Header 1', 'Column Header 2', 'Column Header 3', 'Column Header 4'],
            simpleTreeData: [
                {
                    rowData: ['Data 1', 'Data 2', 'Data 3', 'Data 4'],
                    children: [
                        {
                            rowData: ['Child 1', 'Child 2', 'Child 3'],
                            children: [
                                {
                                    rowData: ['Grandchild 1', 'Grandchild 2', 'Grandchild 3', 'Grandchild 4']
                                }
                            ]
                        }
                    ]
                },
                {
                    rowData: ['Data 5', 'Data 6', 'Data 7', 'Data 8']
                },
                {
                    rowData: ['Data 9'],
                    children: [
                        {
                            rowData: ['Child 5', 'Child 6', 'Child 7', 'Child 8']
                        }
                    ]
                }
            ],
            richTreeData: [
                {
                    rowData: [
                        {
                            displayText: 'Search Engines'
                        }
                    ],
                    children: [
                        {
                            rowData: [
                                {
                                    displayText: ' '
                                },
                                {
                                    displayText: 'Google',
                                    linkUrl: 'http://google.com'
                                },
                                {
                                    displayText: 'Bing',
                                    linkUrl: 'http://bing.com'
                                },
                                {
                                    displayText: 'Yahoo',
                                    linkUrl: 'http://yahoo.com'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        state: {
            disabled: false
        }
    };

    simpleTreeHtml = `
        <fd-tree (editRowClicked)="editRowClicked($event)" (deleteRowClicked)="deleteRowClicked($event)"\n
                 [displayTreeActions]="true" [headers]="headers" [treeData]="treeData">\n
        </fd-tree>`;

    simpleTreeJson = `
        headers: ["Column Header 1", "Column Header 2", "Column Header 3", "Column Header 4"],
        treeData: [
          {
            rowData: ["Data 1", "Data 2", "Data 3", "Data 4"],
            children: [
              {
                rowData: ["Child 1", "Child 2", "Child 3"],
                children: [
                  {
                    rowData: ["Grandchild 1", "Grandchild 2", "Grandchild 3", "Grandchild 4"]
                  }
                ]
              }
            ]
          },
          {
            rowData: ["Data 5", "Data 6", "Data 7", "Data 8"]
          },
          {
            rowData: ["Data 9"],
            children: [
              {
                rowData: ["Child 5", "Child 6", "Child 7", "Child 8"]
              }
            ]
          }
        ]`;

    richTreeHtml = `<fd-tree [headers]="headers" [treeData]="treeData">\n\n</fd-tree>`;

    richTreeJson = `
        headers: ["Column Header 1", "Column Header 2", "Column Header 3", "Column Header 4"],
        treeData: [
          {
            rowData: [
              {
                displayText: "Search Engines"
              }
            ],
            children: [
              {
                rowData: [
                  {
                    displayText: " "
                  },
                  {
                    displayText: "Google",
                    linkUrl: "http://google.com"
                  },
                  {
                    displayText: "Bing",
                    linkUrl: "http://bing.com"
                  },
                  {
                    displayText: "Yahoo",
                    linkUrl: "http://yahoo.com"
                  }
                ]
              }
            ]
          }
        ]`;

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('tree');
    }

    onSchemaValues(data) {
        this.data = data;
    }

    editRowClicked(row) {
        alert('Edit row clicked');
        console.log(row);
    }

    deleteRowClicked(row) {
        alert('Delete row clicked');
        console.log(row);
    }
}

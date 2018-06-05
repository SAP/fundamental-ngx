import { Component } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

@Component({
    selector: 'app-table',
    templateUrl: './table-docs.component.html'
})
export class TableDocsComponent {
    static schema: Schema = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    headers: {
                        type: 'string[]'
                    },
                    tableData: {
                        type: 'TableRowObject[]'
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
            simpleHeaders: ['Column Header 1', 'Column Header 2', 'Column Header 3', 'Column Header 4'],
            simpleTableData: [
                {
                    rowData: ['Data 1', 'Data 2', 'Data 3', 'Data 4']
                },
                {
                    rowData: ['Data 5', 'Data 6', 'Data 7', 'Data 8']
                }
            ],
            richHeaders: ['Avatar', 'email', 'First Name', 'Last Name', 'Date'],
            richTableData: [
                {
                    rowData: [
                        {
                            imageUrl: 'https://robohash.org/green?size=50x50'
                        },
                        {
                            displayText: 'john.brown@qwerty.io',
                            linkUrl: 'mailto:john.brown@qwerty.io'
                        },
                        {
                            displayText: 'John'
                        },
                        {
                            displayText: 'Brown'
                        },
                        {
                            displayText: '05/14/17'
                        }
                    ]
                },
                {
                    rowData: [
                        {
                            imageUrl: 'https://robohash.org/brown?size=50x50'
                        },
                        {
                            displayText: 'florence.garcia@qwerty.io',
                            linkUrl: 'mailto:florence.garcia@qwerty.io'
                        },
                        {
                            displayText: 'Florence'
                        },
                        {
                            displayText: 'Garcia'
                        },
                        {
                            displayText: '05/14/17'
                        }
                    ]
                },
                {
                    rowData: [
                        {
                            imageUrl: 'https://robohash.org/Q27.png?set=set1&size=50x50'
                        },
                        {
                            displayText: 'mark.helper@qwerty.io',
                            linkUrl: 'mailto:mark.helper@qwerty.io'
                        },
                        {
                            displayText: 'Mark'
                        },
                        {
                            displayText: 'Helper'
                        },
                        {
                            displayText: '07/14/17'
                        }
                    ]
                },
                {
                    rowData: [
                        {
                            imageUrl: 'https://robohash.org/water?&size=50x50'
                        },
                        {
                            displayText: 'beth.butler@qwerty.io',
                            linkUrl: 'mailto:beth.butler@qwerty.io'
                        },
                        {
                            displayText: 'Beth'
                        },
                        {
                            displayText: 'Butler'
                        },
                        {
                            displayText: '08/14/17'
                        }
                    ]
                },
                {
                    rowData: [
                        {
                            imageUrl: 'https://robohash.org/red?size=50x50'
                        },
                        {
                            displayText: 'stephen.johnson@qwerty.io',
                            linkUrl: 'mailto:stephen.johnson@qwerty.io'
                        },
                        {
                            displayText: 'Stephen'
                        },
                        {
                            displayText: 'Johnson'
                        },
                        {
                            displayText: '09/14/17'
                        }
                    ]
                }
            ]
        },
        state: {
            disabled: false
        }
    };

    simpleTableHtml = '<fd-table [headers]="headers" [tableData]="tableData">\n' + '\n' + '</fd-table>';

    simpleTableJson =
        "headers: ['Column Header 1', 'Column Header 2', 'Column Header 3', 'Column Header 4'],\n" +
        'tableData: [\n' +
        '  {\n' +
        "    rowData: ['Data 1', 'Data 2', 'Data 3', 'Data 4']\n" +
        '  },\n' +
        '  {\n' +
        "    rowData: ['Data 5', 'Data 6', 'Data 7', 'Data 8']\n" +
        '  }\n' +
        ']';

    richTableHtml = '<fd-table [headers]="headers" [tableData]="tableData">\n' + '\n' + '</fd-table>';

    richTableJson =
        "headers: ['Avatar', 'email', 'First Name', 'Last Name', 'Date'],\n" +
        'tableData: [\n' +
        '    {\n' +
        '      rowData: [\n' +
        '        {\n' +
        "          imageUrl: 'https://robohash.org/green?size=50x50'\n" +
        '        },\n' +
        '        {\n' +
        "          displayText: 'john.brown@qwerty.io',\n" +
        "          linkUrl: 'mailto:john.brown@qwerty.io'\n" +
        '        },\n' +
        '        {\n' +
        "          displayText: 'John'\n" +
        '        },\n' +
        '        {\n' +
        "          displayText: 'Brown'\n" +
        '        },\n' +
        '        {\n' +
        "          displayText: '05/14/17'\n" +
        '        }\n' +
        '      ]\n' +
        '    },\n' +
        '    {\n' +
        '      rowData: [\n' +
        '        {\n' +
        "          imageUrl: 'https://robohash.org/brown?size=50x50'\n" +
        '        },\n' +
        '        {\n' +
        "          displayText: 'florence.garcia@qwerty.io',\n" +
        "          linkUrl: 'mailto:florence.garcia@qwerty.io'\n" +
        '        },\n' +
        '        {\n' +
        "          displayText: 'Florence'\n" +
        '        },\n' +
        '        {\n' +
        "          displayText: 'Garcia'\n" +
        '        },\n' +
        '        {\n' +
        "          displayText: '05/14/17'\n" +
        '        }\n' +
        '      ]\n' +
        '    },\n' +
        '    {\n' +
        '      rowData: [\n' +
        '        {\n' +
        "          imageUrl: 'https://robohash.org/Q27.png?set=set1&size=50x50'\n" +
        '        },\n' +
        '        {\n' +
        "          displayText: 'mark.helper@qwerty.io',\n" +
        "          linkUrl: 'mailto:mark.helper@qwerty.io'\n" +
        '        },\n' +
        '        {\n' +
        "          displayText: 'Mark'\n" +
        '        },\n' +
        '        {\n' +
        "          displayText: 'Helper'\n" +
        '        },\n' +
        '        {\n' +
        "          displayText: '07/14/17'\n" +
        '        }\n' +
        '      ]\n' +
        '    },\n' +
        '    {\n' +
        '      rowData: [\n' +
        '        {\n' +
        "          imageUrl: 'https://robohash.org/water?&size=50x50'\n" +
        '        },\n' +
        '        {\n' +
        "          displayText: 'beth.butler@qwerty.io',\n" +
        "          linkUrl: 'mailto:beth.butler@qwerty.io'\n" +
        '        },\n' +
        '        {\n' +
        "          displayText: 'Beth'\n" +
        '        },\n' +
        '        {\n' +
        "          displayText: 'Butler'\n" +
        '        },\n' +
        '        {\n' +
        "          displayText: '08/14/17'\n" +
        '        }\n' +
        '      ]\n' +
        '    },\n' +
        '    {\n' +
        '      rowData: [\n' +
        '        {\n' +
        "          imageUrl: 'https://robohash.org/red?size=50x50'\n" +
        '        },\n' +
        '        {\n' +
        "          displayText: 'stephen.johnson@qwerty.io',\n" +
        "          linkUrl: 'mailto:stephen.johnson@qwerty.io'\n" +
        '        },\n' +
        '        {\n' +
        "          displayText: 'Stephen'\n" +
        '        },\n' +
        '        {\n' +
        "          displayText: 'Johnson'\n" +
        '        },\n' +
        '        {\n' +
        "          displayText: '09/14/17'\n" +
        '        }\n' +
        '      ]\n' +
        '    }\n' +
        '  ]';

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('table');
    }

    onSchemaValues(data) {
        this.data = data;
    }
}

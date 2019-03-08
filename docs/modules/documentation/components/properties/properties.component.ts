import { Component, Input, OnInit } from '@angular/core';

export interface ComponentProperty {
    name: string;
    description: string;
}

export interface ComponentProperties {
    childComponents: ComponentProperty[];
    directives: ComponentProperty[];
    attributes: ComponentProperty[];
    inputs: ComponentProperty[];
    outputs: ComponentProperty[];
    properties: ComponentProperty[];
}

@Component({
    selector: 'properties',
    template: `
    <ng-container *ngFor="let type of keys">
      <ng-container *ngIf="properties[type].length !== 0">
        <h3 class="header">@{{ titles[type] }}</h3>
        <table>
          <tr class="property-row" *ngFor="let property of properties[type]">
            <th class="property-header">{{ property.name }}</th>
            <td>{{ property.description }}</td>
          </tr>
        </table>
      </ng-container>
    </ng-container>
  `,
    styles: [
        `
            .property-header {
                text-align: left;
                padding-right: 1rem;
                font-size: 1rem;
                vertical-align: text-top;
            }
            
            .header {
                margin-bottom: 0.5rem;
            }
        `
    ]
})
export class PropertiesComponent implements OnInit {
    @Input() properties: ComponentProperties;

    titles = {
        childComponents: 'Child Components',
        directives: 'Directives',
        attributes: 'Attributes',
        inputs: 'Inputs',
        outputs: 'Outputs',
        properties: 'Properties'
    };

    ngOnInit() {
        this.properties = {
            childComponents: [],
            directives: [],
            attributes: [],
            inputs: [],
            outputs: [],
            properties: [],
            ...this.properties
        };
    }

    get keys() {
        return Object.keys(this.properties);
    }
}

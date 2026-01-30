import { Component } from '@angular/core';
import { InfoLabelColorInput, InfoLabelComponent } from '@fundamental-ngx/core/info-label';

interface InfoLabelData {
    color: InfoLabelColorInput;
    label: string;
    title: string;
}

@Component({
    selector: 'fd-info-label-example',
    templateUrl: './info-label-example.component.html',
    styleUrls: ['./info-label-example.component.scss'],
    imports: [InfoLabelComponent]
})
export class InfoLabelExampleComponent {
    infoLabels: InfoLabelData[] = [
        { color: '1', label: 'Available', title: 'Available Status' },
        { color: '2', label: 'In Progress', title: 'In Progress Status' },
        { color: '3', label: 'Completed', title: 'Completed Status' },
        { color: '4', label: 'Pending', title: 'Pending Status' },
        { color: '5', label: 'Approved', title: 'Approved Status' },
        { color: '6', label: 'On Hold', title: 'On Hold Status' },
        { color: '7', label: 'Default', title: 'Default Status' },
        { color: '8', label: 'Cancelled', title: 'Cancelled Status' },
        { color: '9', label: 'Rejected', title: 'Rejected Status' },
        { color: '10', label: 'Archived', title: 'Archived Status' }
    ];

    iconLabels: InfoLabelData[] = [
        { color: '1', label: 'Active', title: 'Active Component' },
        { color: '2', label: 'Building', title: 'Building Component' },
        { color: '3', label: 'Ready', title: 'Ready Component' },
        { color: '4', label: 'Testing', title: 'Testing Component' },
        { color: '5', label: 'Verified', title: 'Verified Component' },
        { color: '6', label: 'Paused', title: 'Paused Component' },
        { color: '7', label: 'Standard', title: 'Standard Component' },
        { color: '8', label: 'Stopped', title: 'Stopped Component' },
        { color: '9', label: 'Error', title: 'Error Component' },
        { color: '10', label: 'Deprecated', title: 'Deprecated Component' }
    ];
}

import { CdkScrollable } from '@angular/cdk/overlay';

import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { BarModule } from '@fundamental-ngx/core/bar';
import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogRef
} from '@fundamental-ngx/core/dialog';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';

@Component({
    template: `
        <fd-dialog>
            <fd-dialog-header>
                <h1 id="fd-dialog-header-1" fd-title>{{ dialogRef.data.title }}</h1>
            </fd-dialog-header>
            <fd-dialog-body>
                <p id="fd-dialog-body-1" [ngStyle]="{ 'text-align': 'justify', margin: 0 }">
                    {{ dialogRef.data.pinnapleDescription }}
                </p>
                <ul [style.margin-bottom]="0">
                    @for (fact of dialogRef.data.pineappleFunFacts; track fact) {
                        <li>
                            {{ fact }}
                        </li>
                    }
                </ul>
            </fd-dialog-body>
            <fd-dialog-footer>
                <fd-button-bar
                    label="Interesting"
                    fdType="emphasized"
                    (click)="dialogRef.close('Continue')"
                    ariaLabel="Interesting Emphasized"
                >
                </fd-button-bar>
                <fd-button-bar
                    label="Cancel"
                    fdType="transparent"
                    (click)="dialogRef.dismiss('Cancel')"
                    ariaLabel="Cancel"
                >
                </fd-button-bar>
            </fd-dialog-footer>
        </fd-dialog>
    `,
    imports: [
        TitleComponent,
        CdkScrollable,
        ScrollbarDirective,
        BarModule,
        NgStyle,
        DialogFooterComponent,
        DialogBodyComponent,
        DialogHeaderComponent,
        DialogComponent
    ]
})
export class DialogExampleComponent {
    constructor(public dialogRef: DialogRef) {}
}

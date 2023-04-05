import { Component } from '@angular/core';

@Component({
    selector: 'fdk-different-observe-target-example',
    template: `
        <div id="fd-different-observe-target-example-container" #source>
            <ng-template [fdkBreakpointLt]="400" [fdkBreakpointObserve]="source">
                <div>Visible when container is less than 400px wide</div>
            </ng-template>
            <ng-template [fdkBreakpointLt]="800" [fdkBreakpointObserve]="source">
                <div>Visible when container is less than 800px wide</div>
            </ng-template>
            <ng-template [fdkBreakpointLt]="1100" [fdkBreakpointObserve]="source">
                <div>Visible when container is less than 1100px wide</div>
            </ng-template>
            <ng-template [fdkBreakpointGt]="1100" [fdkBreakpointObserve]="source">
                <div>Visible when container is more than 1100px wide</div>
            </ng-template>
        </div>
        Container is {{ source.offsetWidth }}px wide
    `,
    styles: [
        `
            @media screen and (max-width: 599px) {
                .fd-different-observe-target-example-container {
                    max-width: 400px;
                }
            }

            @media screen and (max-width: 1199px) {
                .fd-different-observe-target-example-container {
                    max-width: 800px;
                }
            }

            @media screen and (min-width: 1200px) {
                .fd-different-observe-target-example-container {
                    max-width: 1100px;
                }
            }
        `
    ]
})
export class DifferentObserveTargetExampleComponent {}

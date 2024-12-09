import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { NestedButtonDirective } from '@fundamental-ngx/btp/button';
import { ButtonComponent } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fdb-button-nested-example',
    template: `
        <h4 id="roundedNestedButtonHeading">Rounded nested button</h4>
        <div [ngStyle]="{ display: 'flex', gap: '0.5rem' }" aria-describedby="roundedNestedButtonHeading">
            <button fd-button fdbNestedButton ariaLabel="Go Home" glyph="home"></button>
            <button fd-button fdbNestedButton ariaLabel="Cancel" glyph="decline"></button>
        </div>
        <h4 id="squaredNestedButtonHeading">Squared nested button</h4>
        <div [ngStyle]="{ display: 'flex', gap: '0.5rem' }" aria-describedby="squaredNestedButtonHeading">
            <button fd-button fdbNestedButton square ariaLabel="Go Home" glyph="home"></button>
            <button fd-button fdbNestedButton square ariaLabel="Cancel" glyph="decline"></button>
        </div>
    `,
    imports: [ButtonComponent, NgStyle, NestedButtonDirective]
})
export class NestedExampleComponent {}

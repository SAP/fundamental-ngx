import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { NestedButtonDirective } from '@fundamental-ngx/btp/button';
import { ButtonComponent } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fdb-button-nested-example',
    template: `
        <div [ngStyle]="{ display: 'flex', gap: '0.5rem' }">
            <button fd-button fdbNestedButton ariaLabel="Go Home" glyph="home"></button>
            <button fd-button fdbNestedButton ariaLabel="Cancel" glyph="decline"></button>
        </div>
    `,
    standalone: true,
    imports: [ButtonComponent, NgStyle, NestedButtonDirective]
})
export class NestedExampleComponent {}

import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { ToolHeaderButtonDirective } from '@fundamental-ngx/btp/button';
import { ButtonBadgeDirective, ButtonComponent } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fdb-button-tool-header-example',
    template: `
        <div [ngStyle]="{ display: 'flex', gap: '0.5rem' }">
            <button fd-button fdbToolHeaderButton ariaLabel="Home" glyph="home"></button>

            <button fd-button fdbToolHeaderButton disabled ariaLabel="Home" glyph="home"></button>

            <button fd-button fdbToolHeaderButton ariaLabel="Home" glyph="home">
                <fd-button-badge />
            </button>
        </div>
    `,
    imports: [ButtonComponent, NgStyle, ButtonBadgeDirective, ToolHeaderButtonDirective]
})
export class ToolHeaderExampleComponent {}

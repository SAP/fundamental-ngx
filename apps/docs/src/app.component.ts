import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FdGuideChatComponent } from './fd-guide-chat.component';

@Component({
    selector: 'app-root',
    template: `
        <router-outlet></router-outlet>
        <fd-guide-chat></fd-guide-chat>
    `,
    imports: [RouterOutlet, FdGuideChatComponent]
})
export class AppComponent {}

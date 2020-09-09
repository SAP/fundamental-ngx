import {
    Component,
    OnInit
} from '@angular/core';
import { AppShellProviderService } from '../../../../libs/app-shell/src/lib/api/app-shell-provider.service';
import { MapMessage } from '../../../../libs/app-shell/src/lib/api/events/event-bus';

@Component({
    selector: 'fundamental-ngx-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    currentTheme = 'I know know';


    constructor(private appShellProvider: AppShellProviderService) {
    }

    ngOnInit(): void {
        this.appShellProvider.themeManager.onChange((m: MapMessage<string>) => {
            if (m) {
                this.currentTheme = m.get('name');
            }
        });
    }

}

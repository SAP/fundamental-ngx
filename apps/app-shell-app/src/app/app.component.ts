import {
    Component,
    OnInit
} from '@angular/core';
import { MapMessage, AppShellProviderService } from '@fundamental-ngx/app-shell';

@Component({
    selector: 'aba-ngx-root',
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

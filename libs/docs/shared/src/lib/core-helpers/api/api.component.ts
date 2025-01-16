import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { MenuComponent, MenuModule } from '@fundamental-ngx/core/menu';
import { ApiDocsService } from '../../services/api-docs.service';

@Component({
    selector: 'fd-api',
    templateUrl: './api.component.html',
    styleUrls: ['./api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent, MenuModule]
})
export class ApiComponent implements OnInit {
    @ViewChild('menu')
    menu: MenuComponent;

    files: string[];
    activeFile: string;
    result: string;

    constructor(
        private route: ActivatedRoute,
        private apiService: ApiDocsService
    ) {}

    ngOnInit(): void {
        if (this.route.snapshot.data) {
            this.files = this.route.snapshot.data['content'];
        }

        if (this.files && this.files.length > 0) {
            this.files.sort();
            this.getFile(this.files[0]);
            this.activeFile = this.files[0];
        } else {
            this.result = '<h2>No API files found.</h2>';
        }
    }

    getFile(file: string): void {
        this.apiService.getComponentHtml(file).subscribe(
            (data) => {
                this.result = data;
                this.activeFile = file;
                this.menu.close();
            },
            (error) => {
                console.warn('Did not find file ' + file + '.\nError: ' + error);
            }
        );
    }
}

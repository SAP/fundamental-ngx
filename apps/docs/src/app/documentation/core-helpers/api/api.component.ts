import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiDocsService } from '../../services/api-docs.service';

@Component({
    selector: 'fd-api',
    templateUrl: './api.component.html',
    styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {
    files: string[];
    activeFile: string;
    result: string;
    openMenu: boolean = false;

    constructor(private route: ActivatedRoute, private apiService: ApiDocsService) {}

    ngOnInit() {
        if (this.route.snapshot.data) {
            this.files = this.route.snapshot.data.content;
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
                this.openMenu = false;
            },
            (error) => {
                console.warn('Did not find file ' + file + '.\nError: ' + error);
            }
        );
    }
}

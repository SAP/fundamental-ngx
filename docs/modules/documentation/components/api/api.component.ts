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
    result: string;

    constructor(private route: ActivatedRoute,
                private apiService: ApiDocsService) {
    }

    ngOnInit() {
        this.files = this.route.snapshot.data.content;
        this.apiService.getComponentHtml(this.files[1]).subscribe(data => {
            this.result = data;
        });
    }

}

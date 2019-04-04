import { Component, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API_FILES } from '../../utilities/api-files';
import { ApiDocsService } from '../../services/api-docs.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'fd-api',
    templateUrl: './api.component.html',
    styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {

    files: string[];
    result: string;

    constructor(private route: ActivatedRoute,
                private apiService: ApiDocsService,
                private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.files = API_FILES[this.route.snapshot.data.component];
        this.apiService.getComponentHtml(this.files[0]).subscribe(data => {
            this.result = this.sanitizer.sanitize(SecurityContext.HTML, data);
        });
    }

}

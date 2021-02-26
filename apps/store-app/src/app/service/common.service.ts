import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class CommonService {

    constructor(
        private titleService: Title
    ) {}

    $title: Subject<string> = new Subject<string>();

    setTitle(title: string): void {
        this.titleService.setTitle(title);
        this.$title.next(title);
    }

}

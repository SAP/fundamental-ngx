import { Injectable } from '@angular/core';

@Injectable()
export class HashService {

    count: number = 0;

    hash(): number {
        this.count = this.count + 1;
        return this.count;
    }
}

import { Injectable } from '@angular/core';

@Injectable()
export class HashService {
    hash(): string {
        return 'FUI' + Math.floor(Math.random() * 1000000);
    }
}

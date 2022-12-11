import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardLoaderComponent } from './card-loader.component';

import { CLASS_NAME } from './constants';

describe('CardLoaderComponent', () => {
    let fixture: ComponentFixture<CardLoaderComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [CardLoaderComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardLoaderComponent);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add className to host', () => {
        expect(fixture.debugElement.nativeElement.className.includes(CLASS_NAME.cardLoader)).toBeTrue();
    });
});

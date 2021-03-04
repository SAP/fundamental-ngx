import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { CardLoaderComponent } from './card-loader.component';
import { CLASS_NAME } from './constants';

describe('CardLoaderComponent', () => {
    let fixture: ComponentFixture<CardLoaderComponent>;
    let component: CardLoaderComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [CardLoaderComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardLoaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add className to host', () => {
        expect(fixture.debugElement.classes[CLASS_NAME.cardLoader]).toBeTrue();
    });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { CardCounterComponent } from './card-counter.component';
import { CLASS_NAME } from './constants';

describe('CardCounterComponent', () => {
    let fixture: ComponentFixture<CardCounterComponent>;
    let component: CardCounterComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [CardCounterComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardCounterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add className to host', () => {
        expect(fixture.debugElement.classes[CLASS_NAME.cardCounter]).toBeTrue();
    });
});

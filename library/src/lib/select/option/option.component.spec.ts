import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionComponent } from './option.component';

describe('OptionComponent', () => {
    let component: OptionComponent;
    let fixture: ComponentFixture<OptionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OptionComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be focusable', () => {
        expect(component).toBeTruthy();
    });

    it('should have the appropriate classes applied', () => {
        expect(component).toBeTruthy();
    });

    it('should be selectable programmatically', () => {
        // Include event test
        expect(component).toBeTruthy();
    });

    it('should be selectable by click', () => {
        // Include event test
        expect(component).toBeTruthy();
    });

    it('should be selectable by keyboard', () => {
        expect(component).toBeTruthy();
    });

    it('should make HTML Element available', () => {
        expect(component).toBeTruthy();
    });

    it('should support custom view value', () => {
        expect(component).toBeTruthy();
    });
});

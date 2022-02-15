import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectStatusComponent, ObjectStatusState } from './object-status.component';

describe('ObjectStatusComponent', () => {
    let component: ObjectStatusComponent;
    let nativeElement: HTMLElement;
    let fixture: ComponentFixture<ObjectStatusComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ObjectStatusComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ObjectStatusComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should apply appropriate state class', () => {
        const states: ObjectStatusState[] = ['positive', 'critical', 'negative', 'info'];
        states.forEach((state) => {
            component.state = state;
            fixture.detectChanges();

            expect(nativeElement.classList).toContain(`fn-object-status--${state}`);
        });
    });

    it('should make component byline', () => {
        component.byline = true;
        fixture.detectChanges();

        expect(nativeElement.classList).toContain('fn-object-status--byline');
    });

    it('should make component interactive', () => {
        component.interactive = true;
        fixture.detectChanges();

        expect(nativeElement.classList).toContain('fn-object-status--interactive');
        expect(nativeElement.getAttribute('tabindex')).toEqual('0');
    });

    it('should disable element', () => {
        component.disabled = true;
        fixture.detectChanges();

        expect(nativeElement.classList).toContain('is-disabled');
        expect(nativeElement.getAttribute('tabindex')).toEqual('-1');
    });
});

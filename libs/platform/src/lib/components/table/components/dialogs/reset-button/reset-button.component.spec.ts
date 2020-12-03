import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';

import { RESETTABLE_TOKEN, Resettable, ViewSettingsResetButtonComponent } from './reset-button.component';

describe('PlatformTableResetButtonComponent', () => {
    let component: ViewSettingsResetButtonComponent;
    let fixture: ComponentFixture<ViewSettingsResetButtonComponent>;
    const isResetAvailableSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    const resetable: Resettable = {
        reset: () => {},
        isResetAvailable$: isResetAvailableSubject$.asObservable()
    };

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ViewSettingsResetButtonComponent],
                providers: [{ provide: RESETTABLE_TOKEN, useExisting: resetable }]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        isResetAvailableSubject$.next(false);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewSettingsResetButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be disabled if reset is not available', () => {
        const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;

        expect(button.disabled).toBeTruthy();

        isResetAvailableSubject$.next(true);
        fixture.detectChanges();

        expect(button.disabled).toBeFalsy();
    });

    it('should run reset on click', () => {
        const resetSpy = spyOn(resetable, 'reset').and.callThrough();
        const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;

        isResetAvailableSubject$.next(true);
        fixture.detectChanges();
        button.click();
        fixture.detectChanges();

        expect(resetSpy).toHaveBeenCalled();
    });
});

import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

import { ButtonModule } from '@fundamental-ngx/core/button';

import { RESETTABLE_TOKEN, Resettable, ResetButtonComponent } from './reset-button.component';

class ResettableMock implements Resettable {
    readonly isResetAvailableSubject$ = new BehaviorSubject<boolean>(false);
    readonly isResetAvailable$ = this.isResetAvailableSubject$.asObservable();
    reset(): void {}
}

describe('PlatformTableResetButtonComponent', () => {
    let component: ResetButtonComponent;
    let fixture: ComponentFixture<ResetButtonComponent>;
    let resettable: ResettableMock;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ButtonModule],
            declarations: [ResetButtonComponent],
            providers: [
                {
                    provide: RESETTABLE_TOKEN,
                    useFactory: () => {
                        resettable = new ResettableMock();
                        return resettable;
                    }
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResetButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be disabled if reset is not available', () => {
        const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;

        expect(button.disabled).toBeTruthy();

        resettable.isResetAvailableSubject$.next(true);
        fixture.detectChanges();

        expect(button.disabled).toBeFalsy();
    });

    it('should disable button if isResetAvailableSubject$ = false', () => {
        const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;

        resettable.isResetAvailableSubject$.next(false);
        fixture.detectChanges();

        expect(button.disabled).toBeTruthy();
    });

    it('should run reset on click', () => {
        const resetSpy = spyOn(resettable, 'reset').and.callThrough();
        const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;

        resettable.isResetAvailableSubject$.next(true);
        fixture.detectChanges();
        button.click();
        fixture.detectChanges();

        expect(resetSpy).toHaveBeenCalled();
    });
});

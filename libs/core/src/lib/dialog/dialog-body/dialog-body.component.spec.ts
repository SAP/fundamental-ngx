import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogBodyComponent } from './dialog-body.component';
import { DialogConfig } from '../utils/dialog-config.class';
import { DialogRef } from '../utils/dialog-ref.class';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';

describe('DialogBodyComponent', () => {
    let component: DialogBodyComponent;
    let fixture: ComponentFixture<DialogBodyComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [BusyIndicatorModule],
            declarations: [DialogBodyComponent],
            providers: [DialogConfig, DialogRef]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogBodyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have proper css classes', () => {
        expect(fixture.nativeElement.classList.contains('fd-dialog__body')).toBe(true);
        expect(fixture.nativeElement.classList.contains('fd-dialog__body--no-vertical-padding')).toBe(false);

        component.dialogConfig.verticalPadding = false;
        fixture.detectChanges();

        expect(fixture.nativeElement.classList.contains('fd-dialog__body--no-vertical-padding')).toBe(true);
    });

    it('should display in loading state', () => {
        expect(fixture.nativeElement.querySelector('fd-busy-indicator')).toBeFalsy();

        component.dialogRef.loading(true);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('fd-busy-indicator')).toBeTruthy();
    });
});

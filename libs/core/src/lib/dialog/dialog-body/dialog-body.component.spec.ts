import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBodyComponent } from './dialog-body.component';
import { DIALOG_CONFIG, DialogConfig } from '../dialog-utils/dialog-config.class';

describe('DialogBodyComponent', () => {
    let component: DialogBodyComponent;
    let fixture: ComponentFixture<DialogBodyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DialogBodyComponent],
            providers: [{provide: DIALOG_CONFIG, useClass: DialogConfig}]
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

        expect(fixture.nativeElement).toHaveClass('fd-dialog__body');
        expect(fixture.nativeElement).not.toHaveClass('fd-dialog__body--no-vertical-padding');

        component.dialogConfig.verticalPadding = false;
        fixture.detectChanges();

        expect(fixture.nativeElement).toHaveClass('fd-dialog__body--no-vertical-padding');
    });
});

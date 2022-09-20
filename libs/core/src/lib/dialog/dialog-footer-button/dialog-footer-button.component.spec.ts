import { TestBed } from '@angular/core/testing';
import { DialogFooterButtonComponent } from './dialog-footer-button.component';

describe('DialogFooterButtonComponent', () => {
    let component: DialogFooterButtonComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DialogFooterButtonComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        const fixture = TestBed.createComponent(DialogFooterButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

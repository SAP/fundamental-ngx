import { DialogFooterButtonComponent } from './dialog-footer-button.component';
import { TestBed } from "@angular/core/testing";

describe('DialogFooterButtonComponent', () => {
    let component: DialogFooterButtonComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DialogFooterButtonComponent]
        }).compileComponents();
        component = TestBed.createComponent(DialogFooterButtonComponent).componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

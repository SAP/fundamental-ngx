import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShellbarComponent } from './shellbar.component';

describe('ShellbarComponent', () => {
    let component: ShellbarComponent;
    let fixture: ComponentFixture<ShellbarComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ShellbarComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShellbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should apply class modifiers', async () => {
        await fixture.whenStable();
        let productElementClass =
            fixture.debugElement.nativeElement.querySelector('.fd-shellbar__group--product')?.classList;
        expect(productElementClass).not.toContain('fd-shellbar__group--shrink');
        expect(productElementClass).not.toContain('fd-shellbar__group--basis-auto');
        component.groupFlex = {
            product: {
                shrink: true,
                flexBasisAuto: true
            }
        };

        await fixture.whenStable();

        productElementClass =
            fixture.debugElement.nativeElement.querySelector('.fd-shellbar__group--product')?.classList;

        expect(productElementClass).toContain('fd-shellbar__group--shrink');
        expect(productElementClass).toContain('fd-shellbar__group--basis-auto');
    });
});

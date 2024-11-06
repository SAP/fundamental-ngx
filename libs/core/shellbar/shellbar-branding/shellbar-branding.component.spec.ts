import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShellbarBrandingComponent } from './shellbar-branding.component';

describe('ShellbarBrandingComponent', () => {
    let component: ShellbarBrandingComponent;
    let fixture: ComponentFixture<ShellbarBrandingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ShellbarBrandingComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ShellbarBrandingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

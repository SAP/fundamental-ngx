import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShellbarSpacerComponent } from './shellbar-spacer.component';

describe('ShellbarSpacerComponent', () => {
    let component: ShellbarSpacerComponent;
    let fixture: ComponentFixture<ShellbarSpacerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ShellbarSpacerComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ShellbarSpacerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShellbarSeparatorComponent } from './shellbar-separator.component';

describe('ShellbarSeparatorComponent', () => {
    let component: ShellbarSeparatorComponent;
    let fixture: ComponentFixture<ShellbarSeparatorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ShellbarSeparatorComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ShellbarSeparatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

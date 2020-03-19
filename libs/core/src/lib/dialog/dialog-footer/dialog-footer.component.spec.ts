import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFooterComponent } from './dialog-footer.component';
import { Component } from '@angular/core';
import { BarModule } from '@fundamental-ngx/core';
import { TemplateModule } from '../../utils/directives/template/template.module';

@Component({
    template: `
        <fd-dialog-footer>

            <ng-container *ngIf="template === 'default'">
                <button fd-dialog-decisive-button>Default button</button>
            </ng-container>

            <ng-container *ngIf="template === 'custom'">
                <ng-template fdTemplate="footer">
                    <div fd-bar-middle>
                        <button fd-dialog-decisive-button>Custom button</button>
                    </div>
                </ng-template>
            </ng-container>

        </fd-dialog-footer>
    `
})
class FooterTestComponent {
    template: 'default' | 'custom';
}

describe('DialogFooterComponent', () => {
    let component: DialogFooterComponent;
    let fixture: ComponentFixture<DialogFooterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DialogFooterComponent, FooterTestComponent],
            imports: [BarModule, TemplateModule]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

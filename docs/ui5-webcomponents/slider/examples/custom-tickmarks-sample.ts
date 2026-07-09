import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Slider } from '@fundamental-ngx/ui5-webcomponents/slider';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/panel.css';

@Component({
    selector: 'ui5-custom-tickmarks-sample',
    templateUrl: './custom-tickmarks-sample.html',
    imports: [Slider, Label]
})
export class CustomTickmarksSample {
    // Skill level slider (0-100 mapped to skill levels)
    readonly skillValue = signal(50);
    readonly skillTickmarks = signal([
        { value: 0, label: 'Beginner' },
        { value: 25 },
        { value: 50, label: 'Intermediate' },
        { value: 75 },
        { value: 100, label: 'Expert' }
    ]);

    // Date range slider (values represent days, labels show dates)
    readonly dateValue = signal(3);
    readonly dateTickmarks = signal([
        { value: 0, label: 'Mon' },
        { value: 1, label: 'Tue' },
        { value: 2, label: 'Wed' },
        { value: 3, label: 'Thu' },
        { value: 4, label: 'Fri' },
        { value: 5, label: 'Sat' },
        { value: 6, label: 'Sun' }
    ]);

    // Temperature slider with custom labels
    readonly tempValue = signal(20);
    readonly tempTickmarks = signal([
        { value: 0, label: 'Cold' },
        { value: 10 },
        { value: 20, label: 'Comfortable' },
        { value: 30 },
        { value: 40, label: 'Hot' }
    ]);

    onSkillChange(event: UI5WrapperCustomEvent<Slider, 'ui5Change'>): void {
        this.skillValue.set(event.currentTarget.value);
    }

    onDateChange(event: UI5WrapperCustomEvent<Slider, 'ui5Change'>): void {
        this.dateValue.set(event.currentTarget.value);
    }

    onTempChange(event: UI5WrapperCustomEvent<Slider, 'ui5Change'>): void {
        this.tempValue.set(event.currentTarget.value);
    }
}

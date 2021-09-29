import { Observable } from 'rxjs';

import { WizardStepStatus } from '@fundamental-ngx/core/wizard';
import { WizardGeneratorFormGroup } from './wizard-generator-form-group.interface';

export interface WizardGeneratorFormsValue {
    [key: string]: WizardStepFormsValue;
}

export interface WizardStepFormsValue {
    [key: string]: {
        [key: string]: any;
    }
}

export interface WizardVisibleSteps {
    [key: string]: boolean;
}

export interface WizardGeneratorItem {
    /**
     * @description Name of the wizard step. Will be used in navigation bar.
     * @param stepIndex Current step index.
     * @returns Step title
     */
    name: string | ((stepIndex: string) => string | Promise<string> | Observable<string>);

    /**
     * @description Title of the wizard step. Will be used in wizard step body.
     * @param stepIndex Current step index.
     * @returns Step title
     */
    title?: string | ((stepIndex: string) => string | Promise<string> | Observable<string>);

    /**
     * @description The smaller text for labeling the step as optional.
     */
    optionalText?: string | ((stepIndex: string) => string | Promise<string> | Observable<string>);
    /**
     * @description Unique step ID.
     */
    id: string;
    /**
     * @description Icon class name which will be used to display an icon in the navigation bar.
     */
    icon?: string;
    /**
     * @description Should return true or false depending on whether or not this step should be visible.
     * @returns Boolean
     */
    when?: (completedSteps: string[], answers: WizardGeneratorFormsValue) => boolean | Promise<boolean> | Observable<boolean>;

    /**
     * @description Object of dependency fields that are used with `when` function
     */
    dependencyFields?: {
        [key: string]: {
            [key: string]: string[];
        };
    };

    /**
     * @description Whether or not this step is going to create a branch.
     */
    branching?: boolean;

    /**
     * @description List of forms to render.
     */
    formGroups?: WizardGeneratorFormGroup[];

    /**
     * @description Step status.
     */
    status?: WizardStepStatus;

    /**
     * @description Is this step is a summary step
     */
    summary?: boolean;

    /**
     * @hidden
     * @description Used for internal navigation logic to summary step.
     */
    completed?: boolean;
}

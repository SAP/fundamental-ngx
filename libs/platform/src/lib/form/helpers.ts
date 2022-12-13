import { FormStates } from '@fundamental-ngx/core/shared';

/**
 * Returns form state based on priority.
 * @param states Error states of the form fields.
 * @param priorityStates Array of prioritized states.
 * @returns first found form state of `priorityStates`.
 */
export function getFormState(
    states: FormStates[],
    priorityStates: FormStates[] = ['error', 'warning', 'information', 'success', 'default']
): FormStates {
    let priorityState: FormStates = 'default';

    priorityStates.some((state) => {
        const firstErrorState = states.find((formState) => formState === state);

        if (!firstErrorState) {
            return false;
        }

        priorityState = firstErrorState;
        return true;
    });

    return priorityState;
}

import { ControlState } from './../form/form-options';

const stateSet = new Set<ControlState>(['success', 'error', 'warning', 'default', 'information']);

export function isValidControlState(value: any): value is ControlState {
    return stateSet.has(value);
}

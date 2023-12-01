export const formStates = ['success', 'error', 'warning', 'default', 'information'] as const;

export type FormStates = (typeof formStates)[number];

import { Injectable, Type } from '@angular/core';
import { FormComponentDefinition } from './interfaces/form-component-definition';
import { DEFAULT_COMPONENTS_LIST } from './config/default-components-list';
import { BaseDynamicFormGeneratorControl } from './base-dynamic-form-generator-control';

/**
 * Since form generator service most probably will be provided by parent component,
 * so that forms map does not interfere with other form generators,
 * Components Accessor is a separate service with a global scope, which can be also provided per component.
 */
@Injectable()
export class FormGeneratorComponentsAccessorService {
    /**
     * @hidden
     */
    private _formComponentDefinitions: FormComponentDefinition[] = DEFAULT_COMPONENTS_LIST;

    /**
     * @description Adds custom component to the list of available components for the form generator items.
     * @param component Angular component.
     * @param types types of the form item.
     */
    addComponent(component: Type<BaseDynamicFormGeneratorControl>, types: string[]): boolean {
        const bestMatchComponentIndex = this._formComponentDefinitions.findIndex((c) =>
            c.types?.every((t) => types.includes(t))
        );

        if (bestMatchComponentIndex > -1) {
            this._formComponentDefinitions[bestMatchComponentIndex].component = component;
            return true;
        }

        // Try to find component in types key. There might be some unique cases when new component might replace multiple.
        const existingComponents = this._formComponentDefinitions.filter((c) =>
            c.types?.filter((t) => types.includes(t))
        );

        existingComponents.forEach((existingComponent, index) => {
            existingComponent.types = existingComponent.types?.filter((t) => !types.includes(t));
            this._formComponentDefinitions[index] = existingComponent;
        });

        this._formComponentDefinitions.push({
            types,
            component
        });

        return true;
    }

    /**
     * @description Returns best-matched component based on provided `type` argument
     * @param type form item type
     * @returns @see FormComponentDefinition Component definition for the form item
     */
    getComponentDefinitionByType(type: string): FormComponentDefinition | undefined {
        return this._formComponentDefinitions.find((c) => c.types?.includes(type));
    }
}

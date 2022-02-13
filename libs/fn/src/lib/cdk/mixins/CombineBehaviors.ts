// import { Constructor } from '../interfaces/Constructor';

// type Behavior<T extends Constructor<any> = Constructor<any>, BehaviorTrait = Constructor<any>> = (
//     base: T
// ) => T & BehaviorTrait;

// export function CombineBehaviors(...behaviors: Behavior[]): Behavior<> {
//     const combined = behaviors.reduceRight((acc, next) => next(acc), class {});
//     return combined;
// }

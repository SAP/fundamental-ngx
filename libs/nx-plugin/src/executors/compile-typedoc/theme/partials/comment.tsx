import { Reflection, JSX as React, JSX } from 'typedoc';

export function comment(props: Reflection) {
    return (
        <div>
            {props.name === 'Component' && (
                <p class="lead">
                    <strong>Selector:&nbsp;</strong>&lt;&gt;
                </p>
            )}
        </div>
    );
}

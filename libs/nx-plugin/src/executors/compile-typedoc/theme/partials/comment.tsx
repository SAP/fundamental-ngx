import { JSX, Reflection } from 'typedoc';

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

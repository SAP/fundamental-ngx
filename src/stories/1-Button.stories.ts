import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// tslint:disable-next-line: nx-enforce-module-boundaries
import { RadioButtonComponent } from 'libs/core/src/lib/radio/radio-button/radio-button.component';

export default {
  title: 'Button',
  component: RadioButtonComponent,
  moduleMetadata: {
    imports: [RadioButtonComponent]
  }
};

export const Text = () => ({
  template: `  
  <fd-radio-button
  [value]="'val1'"
  id="radio-4"
  name="radio-name-2"
  [disabled]="true"
>
  Option One
</fd-radio-button>`,
});

// export const Emoji = () => ({
//   component: Button,
//   props: {
//     text: '😀 😎 👍 💯',
//   },
// });

// Emoji.story = {
//   parameters: { notes: 'My notes on a button with emojis' },
// };

// export const WithSomeEmojiAndAction = () => ({
//   component: Button,
//   props: {
//     text: '😀 😎 👍 💯',
//     onClick: action('This was clicked OMG'),
//   },
// });

// WithSomeEmojiAndAction.story = {
//   name: 'with some emoji and action',
//   parameters: { notes: 'My notes on a button with emojis' },
// };

// export const ButtonWithLinkToAnotherStory = () => ({
//   component: Button,
//   props: {
//     text: 'Go to Welcome Story',
//     onClick: linkTo('Welcome'),
//   },
// });

// ButtonWithLinkToAnotherStory.story = {
//   name: 'button with link to another story',
// };

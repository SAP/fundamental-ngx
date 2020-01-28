module.exports = {
  stories: ['../src/**/*.stories.ts'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-notes',
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-storysource',
    '@storybook/addon-a11y/register'
  ],
};

const minorConfig = require('./.ncurc.minor');

module.exports = {
  reject: [
    ...minorConfig.reject,
    // Storybook needs React 16 to have support out of the box.
    // Alternatively we could manually keep track of all sub-package versions,
    // but the benefit of upgrading is currently not high enough.
    'react',
    'react-dom',
    '@types/react',
    '@types/react-dom',
    '@testing-library/react',
    // We don't yet use Node 17 so the types of node should also be locked at Node 16.
    '@types/node',
  ],
};

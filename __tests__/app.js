'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-simple-rc:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ componentName: 'Test', componentType: 'class' });
  });

  it('creates files', () => {
    assert.file(['Test.js']);
  });
});

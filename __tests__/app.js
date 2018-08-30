'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const formatter = require('../generators/app/formatter');

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

describe('formatter', () => {
  it('should handle blank inputs', () => {
    assert.textEqual(formatter(), 'App');
  });
  it('should handle spaces', () => {
    assert.textEqual(formatter('hello world'), 'HelloWorld');
  });
  it('should handle underscore', () => {
    assert.textEqual(formatter('hello_world'), 'HelloWorld');
  });
});

'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const formatter = require('../generators/app/formatter');

const defaultVals = {
  componentName: 'Test',
  componentType: 'class',
  linter: 'none',
  JSX: true,
  es6: true
};

describe('generator-simple-rc:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts(defaultVals);
  });

  it('creates files', () => {
    assert.file(['Test.js']);
  });
});

describe('generator-simple-rc:airbnb-linter', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts(
        Object.assign(defaultVals, { componentName: 'AirFun', linter: 'airbnb' })
      );
  });

  it('creates files', () => {
    assert.file(['AirFun.js']);
  });
});

describe('generator-simple-rc:no_es6', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts(
      Object.assign(defaultVals, {
        componentName: 'ClassNo',
        linter: 'none',
        es6: false,
        JSX: true
      })
    );
  });

  it('creates files', () => {
    assert.file(['ClassNo.js']);
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

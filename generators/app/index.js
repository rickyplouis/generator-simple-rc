'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const formatName = componentName =>
  componentName
    .trim()
    .replace(/\s+/g, '')
    .replace(/^\w/, function(char) {
      return char.toUpperCase();
    });

module.exports = class extends Generator {
  prompting() {
    this.argument('templateName', { type: String, required: false });

    this.option('test');
    this.option('--no-jsx');
    this.option('--no-es6');
    // This makes `appname` a required argument.
    const prompts = [
      {
        type: 'input',
        name: 'componentName',
        message: 'What is the name of your component?',
        default: 'Test'
      },
      {
        type: 'list',
        name: 'componentType',
        message: 'What type of your component?',
        default: 'class',
        choices: ['class', 'functional']
      },
      {
        type: 'list',
        name: 'linter',
        message: 'What type of linter will it follow?',
        default: 'none',
        choices: ['none', 'airbnb']
      },
      {
        when: function(response) {
          return response.linter === 'none';
        },
        type: 'confirm',
        name: 'jsx',
        message: 'Use jsx?',
        default: true
      },
      {
        when: function(response) {
          return response.linter === 'none';
        },
        type: 'confirm',
        name: 'es6',
        message: 'Use es6?',
        default: true
      }
    ];
    if (this.options.templateName) {
      return this.fs.copyTpl(
        this.templatePath('airbnb_class.js'),
        this.destinationPath('Test.js'),
        { componentName: 'Test', jsx: true, es6: true }
      );
    }
    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.templateName = this.options.templateName;
      this.args = this.argument;
    });
  }

  writing() {
    this.log('options.templateName' + this.options.templateName);
    if (!this.options.templateName) {
      const templateName =
      this.props.linter === 'none'
      ? this.props.componentType + '.js'
      : this.props.linter + '_' + this.props.componentType + '.js';

      const componentName =
      typeof this.props.componentName === 'string' && this.props.componentName.length > 0
      ? formatName(this.props.componentName)
      : 'TestComponent';

      this.fs.copyTpl(
        this.templatePath(templateName),
        this.destinationPath(componentName + '.js'),
        { componentName: componentName, jsx: this.props.jsx, es6: this.props.es6 }
      );
    }
  }
};

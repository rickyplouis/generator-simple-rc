'use strict';
const Generator = require('yeoman-generator');
const formatter = require('./formatter');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'componentName',
        message: 'What is the name of your component?',
        default: 'App'
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
        name: 'JSX',
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
    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    let templateName = '';
    const componentName =
      typeof this.props.componentName === 'string' && this.props.componentName.length > 0
        ? formatter(this.props.componentName)
        : 'TestComponent';

    if (this.props.linter === 'airbnb') {
      templateName += `airbnb_${this.props.componentType}.js`;
      return this.fs.copyTpl(
        this.templatePath(templateName),
        this.destinationPath(componentName + '.js'),
        { componentName: componentName }
      );
    }
    // Prepends template name with class or functional
    templateName += this.props.componentType;
    if (this.props.es6) {
      templateName += '.js';
      this.fs.copyTpl(
        this.templatePath(templateName),
        this.destinationPath(componentName + '.js'),
        { componentName: componentName, jsx: this.props.JSX }
      );
    } else {
      templateName += '_no_es6.js';
      this.fs.copyTpl(
        this.templatePath(templateName),
        this.destinationPath(componentName + '.js'),
        { componentName: componentName, jsx: this.props.JSX }
      );
    }
  }
};

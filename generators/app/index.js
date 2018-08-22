'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the wonderful ${chalk.blue('generator-simple-rc')} generator!`)
    );

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
        type: 'list',
        name: 'propTypes',
        message: 'Method of type checking?',
        default: 'none',
        choices: ['none', 'propTypes', 'flow', 'typescript']
      },
      {
        type: 'confirm',
        name: 'saveAsTemplate',
        message: 'Would you like to save your settings as a template?',
        default: false
      },
      {
        when: function(response) {
          return response.saveAsTemplate;
        },
        type: 'input',
        name: 'templateName',
        message: 'What would you like to name your template?',
        default: 'SimpleComponent'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath(this.props.componentType + '.js'),
      this.destinationPath(this.props.componentName + '.js'),
      { componentName: this.props.componentName, jsx: this.props.jsx }
    );
  }
};

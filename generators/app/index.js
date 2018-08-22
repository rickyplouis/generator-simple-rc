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
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the wonderful ${chalk.blue('generator-simple-rc')} generator!`)
    );

    this.option('test');

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
    if (this.options.test) {
      this.log('well, i guess thats it');
    } else {
      return this.prompt(prompts).then(props => {
        // To access props later use this.props.someAnswer;
        this.props = props;
      });
    }
  }

  writing() {
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
      { componentName: componentName, jsx: this.props.jsx }
    );
  }
};

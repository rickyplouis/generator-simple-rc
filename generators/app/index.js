'use strict';
const Generator = require('yeoman-generator');

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
    if (this.options.templateName) {
      return this.fs.copyTpl(
        this.templatePath('airbnb_class.js'),
        this.destinationPath('Test.js'),
        { componentName: 'Test', jsx: !this.props.noJSX }
      );
    }
    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    let templateName = '';
    const componentName =
      typeof this.props.componentName === 'string' && this.props.componentName.length > 0
        ? formatName(this.props.componentName)
        : 'TestComponent';

    if (!this.options.templateName) {
      if (this.props.linter === 'airbnb') {
        console.log('this.props.linter', this.props.linter);
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
        console.log('templateName', templateName);
        this.fs.copyTpl(
          this.templatePath(templateName),
          this.destinationPath(componentName + '.js'),
          { componentName: componentName, jsx: this.props.JSX }
        );
      } else {
        console.log('reachd c');
        templateName += '_no_es6.js';
        this.fs.copyTpl(
          this.templatePath(templateName),
          this.destinationPath(componentName + '.js'),
          { componentName: componentName, jsx: this.props.JSX }
        );
      }
    }
  }
};

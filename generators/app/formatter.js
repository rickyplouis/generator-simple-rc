const formatter = (componentName = 'App') =>
  componentName
    .trim()
    .replace(/(\s+)(\w)/g, function(chars) {
      return chars.substring(1).toUpperCase();
    })
    .replace(/(_)(\w)/, function(chars) {
      return chars.substring(1).toUpperCase();
    })
    .replace(/^\w/, function(char) {
      return char.toUpperCase();
    });

module.exports = formatter;

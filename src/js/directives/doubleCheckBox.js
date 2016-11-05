app.directive('ngDoubleCheckBox', function() {
  return {
    restrict: 'E',
    scope: {
      'heading': '@?',
      'leftInputHeading': '@?',
      'rightInputHeading': '@?',
      'headingNumber': '@?',
      'leftDescription' : '@?',
      'rightDescription' : '@?',
      'leftLabel' : '@?',
      'rightLabel' : '@?'
    },
    templateUrl: '/src/html/doubleCheckBox.html'
  }
});

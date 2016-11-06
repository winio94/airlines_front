app.directive('ngDoubleInputBox', function() {
  return {
    restrict: 'E',
    scope: true,
    scope: {
      'heading': '@?',
      'leftInputHeading': '@?',
      'rightInputHeading': '@?',
      'headingNumber': '@?',
      'modelLeft':'=',
      'modelRight':'=',
      'inputType' : '@?'
    },
    templateUrl: '/src/html/doubleInput.html'
  }
});

app.directive('ngDoubleInputBox', function() {
  return {
    restrict: 'E',
    scope: true,
    scope: {
      'heading': '@?',
      'leftInputHeading': '@?',
      'rightInputHeading': '@?',
      'headingNumber': '@?'
    },
    templateUrl: '/src/html/doubleInput.html'
  }
});

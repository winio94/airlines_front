app.directive('ngDoubleInputBox', function () {
  return {
    restrict: 'EA',
    templateUrl: 'html/doubleInput.html',
    scope: {
      'heading': '@?',
      'leftInputHeading': '@?',
      'rightInputHeading': '@?',
      'headingNumber': '@?',
      'modelLeft': '=',
      'modelRight': '=',
      'inputType': '@?',
      'form': '=',
      'index': '@?',
      'leftMinLength': '@?',
      'rightMinLength': '@?',
      'leftMaxLength': '@?',
      'rightMaxLength': '@?',
      'leftPattern': '=',
      'rightPattern': '=',
      'leftPatternMessage': '@?',
      'rightPatternMessage': '@?'
    }
  }
});
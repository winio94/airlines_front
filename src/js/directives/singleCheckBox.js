app.directive('ngSingleCheckBox', function () {
  return {
    restrict: 'E',
    scope: {
      'inputHeading': '@?',
      'description': '@?',
      'label': '=',
      'inputComment': '@?',
      'model': '='
    },
    templateUrl: 'singleCheckBox.html'
  }
});
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
    templateUrl: '/src/html/singleCheckBox.html'
  }
});
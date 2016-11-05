app.directive('ngSingleCheckBox', function() {
  return {
    restrict: 'E',
    scope: {
      'inputHeading': '@?',
      'inputComment': '@?',
      'description': '@?'
    },
    templateUrl: '/src/html/singleCheckBox.html'
  }
});

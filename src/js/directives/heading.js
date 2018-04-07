app.directive('ngHeading', function () {
  return {
    restrict: 'E',
    scope: {
      'icon': '@?',
      'description': '@?',
      'from': '@?',
      'to': '@?',
      'arrow': '@?',
      'headingAlign': '@?'
    },
    templateUrl: 'html/heading.html'
  };
});
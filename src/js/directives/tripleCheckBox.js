app.directive('ngTripleCheckBox', function () {
  return {
    restrict: 'E',
    scope: {
      'heading': '@?',
      'leftInputHeading': '@?',
      'rightInputHeading': '@?',
      'centerInputHeading': '@?',
      'leftDescription': '@?',
      'rightDescription': '@?',
      'centerDescription': '@?',
      'leftLabel': '=',
      'centerLabel': '=',
      'rightLabel': '=',
      'labelComment': '@?',
      'model': '='
    },
    templateUrl: 'html/tripleCheckBox.html'
  }
});
app.directive('ngHeading', function () {
  return {
    restrict: 'E',
    scope: {
      'icon' : '@?',
      'description' : '@?',
      'from': '@?',
      'to':'@?',
      'arrow': '@?'
    },
    template:
    '<div class="heading">'+
    '<div class="headingIcon">'+
    '<i class="{{icon}}"></i>'+
    '</div>' +
    '<div class="heading-content">' +
    '<span class="heading-description">{{description}}</span>'+
    '<span class="heading-from">{{from}}</span>'+
    '<span class="heading-arrow">{{arrow}}</span>'+
    '<span class="heading-to">{{to}}</span>'+
    '</div>'+
    '<div style="clear:both"></div>'+
    '</div>'
  };
});

app.controller("LanguageCtrl", ['$scope', '$translate', function ($scope, $translate) {
  $scope.changeLanguageTo = function (language) {
    $translate.use(language);
  }
}]);
angular.module('ColorCombinatorApp', ['ngSanitize'])
	.controller('ColorCombinatorController', ['$scope', function($scope) {
		$scope.showLoading = false;
		$scope.elementsCount = 5;
		$scope.combinationCounter = 0;
		$scope.elements = [];
		
		$scope.combineColors = function(useReps) {
			$scope.elements = [];
			var opts = {
			  lines: 13, // The number of lines to draw
			  length: 20, // The length of each line
			  width: 10, // The line thickness
			  radius: 30, // The radius of the inner circle
			  corners: 1, // Corner roundness (0..1)
			  rotate: 10, // The rotation offset
			  direction: 1, // 1: clockwise, -1: counterclockwise
			  color: '#000', // #rgb or #rrggbb or array of colors
			  speed: 2.2, // Rounds per second
			  trail: 60, // Afterglow percentage
			  shadow: false, // Whether to render a shadow
			  hwaccel: false, // Whether to use hardware acceleration
			  className: 'spinner', // The CSS class to assign to the spinner
			  zIndex: 2e9, // The z-index (defaults to 2000000000)
			  top: '50%', // Top position relative to parent
			  left: '50%' // Left position relative to parent
			};
			var target = document.getElementById('loading');
			var spinner = new Spinner(opts).spin(target);
			$scope.showLoading = true;
			var counter = 0;
			var colors = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth"];
			var values = [];
			var contentElement = $("#content");
			
			function printCombinations(n){
				if(n > 0){
					var shouldContinue = false;
					for(var element = 0; element < $scope.elementsCount; element++){
						if(!useReps) {
							for(var i = 0; i < values.length; i++) {
								if(values[i] === element){								
									shouldContinue = true;
									break;
								}
							}
							if(shouldContinue){
								shouldContinue = false;
								continue;
							}
						}
						values.push(element);
						printCombinations(n - 1);
						values.pop(element);
					}
				} 
				else {
					var html = "";
					for(var i = 0; i < values.length; i++) {
						html += '<div class="element ' + colors[values[i]] + '"></div>';
					}
					html += "<br>";
					$scope.elements.push({context: html});
					$scope.combinationCounter++;
				}
			}
			if(useReps && $scope.elementsCount > 5){
				var calculatedCount = Math.pow($scope.elementsCount, $scope.elementsCount);
				toastr.error('Sie haben den Wert ' + $scope.elementsCount + ' eingegeben. Mit diesem Wert w&uuml;rden sich ' + calculatedCount + ' Kombinationen ergeben und ich denke das interessiert niemanden.....');	
				spinner.stop();
				return;
			}
			if($scope.elementsCount > 10){
				var calculatedCount = $scope.calculateFaculty($scope.elementsCount);
				toastr.error('Sie haben den Wert ' + $scope.elementsCount + ' eingegeben. Mit diesem Wert w&uuml;rden sich ' + calculatedCount + ' Kombinationen ergeben und ich denke das interessiert niemanden.....');	
				spinner.stop();
				return;
			}
			
			$scope.combinationCounter = 0;
			printCombinations($scope.elementsCount);
			spinner.stop();
			console.debug($scope.elements.length);
			$scope.showLoading = false;
		};		
		$scope.calculateFaculty = function(n) {
			if(n > 1){
				return n * $scope.calculateFaculty(n-1);
			}
			else {
				return 1;
			}
		};
	}]);

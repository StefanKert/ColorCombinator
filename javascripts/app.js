angular.module('ColorCombinatorApp', [])
	.controller('ColorCombinatorController', ['$scope', function($scope) {
		$scope.elementsCount = 5;
		$scope.combinationCounter = 0;
		$scope.changeValues = function() {
			var elements = prompt("Bitte die gewünschte Anzahl an Elementen eingeben (1-10)", "3");		
			if (elements != null && elements > 0 && elements < 8) {
				$scope.elements = elements;
			}
			else {
				MessageBox.Show("Es wurde ein ungültiger Wert angegeben daher wird der Wert 5 verwendet.");
				$scope.elements = 5;
			}
		};
		
		$scope.combineColors = function() {
			var counter = 0;
			var colors = ["#000000", "#0000ff", "#00ff00", "#00ffff", "#ff0000", "#ff00ff", "#ffff00", "#ffffff"];
			var values = [];
			var contentElement = $("#content");
			
			function printCombinations(n){
				if(n > 0){
					var shouldContinue = false;
					for(var element = 0; element < $scope.elementsCount; element++){
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
						values.push(element);
						printCombinations(n - 1);
						values.pop(element);
					}
				} 
				else {
					for(var i = 0; i < values.length; i++) {
						contentElement.append("<span style='background: " + colors[values[i]] + "'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;&nbsp;");
					}
					contentElement.append("<br>");
					$scope.combinationCounter++;
				}
			}
			
			if($scope.elementsCount > 7){
				toastr.error('Bitte geben Sie keine Werte &uuml;ber 7 ein.');	
				return;
			}
			
			$scope.combinationCounter = 0;
			contentElement.empty();
			printCombinations($scope.elementsCount);
		};		
	}]);

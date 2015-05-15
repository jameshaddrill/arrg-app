angular.module('attendanceService', [])

    // super simple service
    // each function returns a promise object
    .factory('Players', ['$http', function($http) {
        return {
            get : function() {
                return $http.get('/api/players');
            },
            create : function(playerData) {
                return $http.post('/api/players', playerData);
            },
            delete : function(id) {
                return $http.delete('/api/players/' + id);
            }
        }
    }]);
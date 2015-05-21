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
            },
            edit : function (id) {
                return $http.get('/api/player/info/' + id);
            },
            update : function(id, editData) {
                return $http.post('/api/player/info/' + id, editData);
            }
        }
    }])
    .factory('Email', ['$http', function($http) {
        return {
            get: function() {
                return $http.get('/api/send');
            }
        }
    }]);
angular.module('MainCtrl', []).controller('MainController', function($scope, Players) {

    $scope.tagline = 'TEST MAIN CONTROLLER';

    $scope.formData = {};

    // GET =====================================================================
    // when landing on the page, get all players and show them
    // use the service to get all the players

    Players.get()
        .success(function(data) {
            $scope.players = data;
        });

   // CREATE ==================================================================
    // when submitting the add form, send the text to the node API
    $scope.createPlayer = function() {

        // validate the formData to make sure that something is there
        // if form is empty, nothing will happen
        // people can't just hold enter to keep adding the same to-do anymore
        if (!$.isEmptyObject($scope.formData)) {

            // call the create function from our service (returns a promise object)
            Players.create($scope.formData)

                // if successful creation, call our get function to get all the new players
                .success(function(data) {
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.players = data; // assign our new list of players
                });
        }
    };

    // DELETE ==================================================================
    // delete a player after checking it
    $scope.deletePlayer = function(id) {
        Players.delete(id)
            // if successful creation, call our get function to get all the new players
            .success(function(data) {
                $scope.players = data; // assign our new list of players
            });
    };

})


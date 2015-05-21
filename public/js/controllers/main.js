angular.module('MainCtrl', []).controller('MainController', function($scope, Players) {

    $scope.formData = {};
    $scope.editData = {};


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

        if (!$.isEmptyObject($scope.formData.text) && !$.isEmptyObject($scope.formData.level)) {
            $('#validation').hide();

            // call the create function from our service (returns a promise object)
            Players.create($scope.formData)

                // if successful creation, call our get function to get all the new players
                .success(function(data) {
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.players = data; // assign our new list of players
                });
        }

        else {
            $('#validation').show();
        }
    };

    // Delete modal
    $scope.showModal = function(id, name) {
        $('#deleteModal').modal();

        $scope.name = name;
        $scope.id = id;
    }

    // Edit modal
    $scope.editModal = function(id, text) {
        Players.edit(id)
            .success(function(data) {

                $('#editModal').modal();

                $scope.playerName = data.text;
                $scope.playerLevel = data.level;

                $scope.id = id;

                $('#editModal input').val($scope.playerName);
                $('#editModal select').val($scope.playerLevel).prop('selected',true);
            })
    }

    // Submit edit
    $scope.editSubmit = function(id, playerName, playerLevel) {

        if ($.isEmptyObject($scope.editData.text))  {
            $scope.editData.text = playerName;
        }
        if ($.isEmptyObject($scope.editData.level)) {
            $scope.editData.level = playerLevel
        }

        Players.update(id, $scope.editData)
            .success(function(data) {
                $scope.editData = {}; // clear the form so our user is ready to enter another
                $scope.players = data; // assign our new list of players
                $('#editModal').modal('hide');
            })

    }

    // DELETE ==================================================================
    // delete a player after checking it
    $scope.deletePlayer = function(id) {
        Players.delete(id)
            // if successful creation, call our get function to get all the new players
            .success(function(data) {
                $scope.players = data; // assign our new list of players
            });

        $('#deleteModal').modal('hide')
    };


})


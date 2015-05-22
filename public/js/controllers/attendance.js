angular.module('AttendanceCtrl', []).controller('AttendanceController', function($scope, Players, Email) {


    $scope.formData = {};

    // GET =====================================================================
    // when landing on the page, get all players and show them
    // use the service to get all the players

    Players.get()
        .success(function(data) {
            $scope.players = data;
        });


    // ADD PLAYER TO 'ATTENDED' LIST

    $scope.selectionOne = [];
    $scope.selectionTwo = [];

    $scope.toggleSelectionOne = function toggleSelection(playerName) {

        var idx = $scope.selectionOne.indexOf(playerName);
        var playerIdent = playerName.replace(/\s+/g, '');

        if ($('#' + playerIdent + '2').prop('checked')) {

            $scope.selectionTwo.splice(idx, 1);
            console.log('unchecked');
            $('#' + playerIdent + '2').prop('checked',false);
        }

        // is currently selected
        if (idx > -1) {
            $scope.selectionOne.splice(idx, 1);
        }
        // is newly selected
        else {
            $scope.selectionOne.push(playerName);
        }

    };

    $scope.toggleSelectionTwo = function toggleSelection(playerName) {

        var idx = $scope.selectionTwo.indexOf(playerName);
        var playerIdent = playerName.replace(/\s+/g, '');

         if ($('#' + playerIdent + '1').prop('checked')) {
            $scope.selectionOne.splice(idx, 1);
            $('#' + playerIdent + '1').prop('checked',false);
        }

        // is currently selected
        if (idx > -1) {
            $scope.selectionTwo.splice(idx, 1);
        }
        // is newly selected
        else {
            $scope.selectionTwo.push(playerName);
        }
    };

    $scope.addAttendance = function() {
        $("#attendanceTables .table1").html('');
        $("#attendanceTables .table2").html('');
        // one point table
        var onePoint = $scope.selectionOne;
        var arrayLength = parseInt(onePoint.length);
        for (i=0; i<arrayLength; i++) {
            $("#attendanceTables .table1").append('<tr><td>'+onePoint[i]+'</td><td>1 Point</td></tr>')
        }

        // two point table
        var twoPoint = $scope.selectionTwo;
        var arrayLength = parseInt(twoPoint.length);
        for (i=0; i<arrayLength; i++) {
            $("#attendanceTables .table2").append('<tr><td>'+twoPoint[i]+'</td><td>2 Points</td></tr>')
        }

        // show tables region
        $('#attendanceTables').show();

        // show 'send email' button
        $('.sendEmail').show();
    };

    $scope.sendEmail = function() {

        // get date for email subject
        var d = new Date();
        var month = d.getMonth()+1;
        var day = d.getDate();
        var output = d.getFullYear() + '/' +
        (month<10 ? '0' : '') + month + '/' +
        (day<10 ? '0' : '') + day;

        // create subject
        var subject = "ARRG Training Attendance " + output;

        // get concatenated tables + notes for email body
        var emailHead = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta name="viewport" content="width=device-width" /><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><title>Really Simple HTML Email Template</title>';
        var emailFoot = '</body></html>';
        var emailContent =  emailHead + ($("#attendanceTables .tables").html()) + '<p>' + $('#notes').val() + '</p>' + emailFoot;

        console.log('sending started');
        var from,to,subject,text;

        // email variables
        to=$("#to").val();
        subject= subject;
        text= emailContent;
        console.log(text);
        $("#message").text("Sending E-mail...Please wait");
        $.get("/send",{to:to,subject:subject,text:text},function(data){
            if(data=="sent") {
                $("#message").empty().html("Email has been sent.");
            }
        });

    };


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


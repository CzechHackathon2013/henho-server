this.index = function (req, res) {
    res.send('Go me!');
};

this.getMeeting = function (req, res) {
    var meetingId = req.params.id
    req.models.meeting.get(meetingId, function (err, meeting) {
        meeting.getUsers(function (err, users) {
            for (var i = 0; i < users.length; i++) {
                var user = {};
                user.name = users[i].username;
                user.email = users[i].email;
                users[i] = user;
            }
            meeting.users = users;
            meeting.getProposedTimes(function (err, proposedTimes) {
                for (var i = 0; i < proposedTimes.length; i++) {
                    var proposedTime = {};
                    proposedTime.start = proposedTimes[i].start.valueOf();
                    proposedTime.end = proposedTimes[i].end.valueOf();
                    proposedTimes[i] = proposedTime
                }
                meeting.proposedTimes = proposedTimes;
                res.json(meeting);
            });
        });
    });
};

this.createMeeting = function (req, res) {
    console.log(req.body);
};

this.acceptTimes = function (req, res) {
    console.log(req.body);
};
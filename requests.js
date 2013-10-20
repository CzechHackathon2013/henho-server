var db = require('./database');

this.index = function (req, res) {
    res.send('Go me!');
};

this.getMeeting = function (req, res) {
    req.models.meeting.get(req.params.id, function (err, meeting) {
        res.json(meeting);
    });
};

this.createMeeting = function (req, res) {
    console.log(req.body);
};

this.acceptTimes = function (req, res) {
    console.log(req.body);
};
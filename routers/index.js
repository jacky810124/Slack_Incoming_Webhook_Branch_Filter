var express = require('express');
var request = require('request');

var router = express.Router();

router.get('/', function(req, res) {

    res.json({
        message: 'ok'
    });
});

router.post('/', function(req, res) {

    var messageBody = {
        "attachments": [{
            "fallback": req.body.user_name + req.body.event_name + "New open task [Urgent]: <http://url_to_task|Test out Slack message attachments>",
            "pretext": req.body.user_name + req.body.event_name + "New open task [Urgent]: <http://url_to_task|Test out Slack message attachments>",
            "color": "#fc6d26",
            "fields": [{
                "title": "Notes",
                "value": "This is much easier than I thought it would be.",
                "short": false
            }]
        }]
    }

    var message = {}

    if (req.body.ref.split('/')[2] === 'master') {

      message = messageBody
    } else {

        message.text = req.body.ref
    }

    request({
      method: 'POST',
      url: 'https://hooks.slack.com/services/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',
      json: message
    }, function(error, response, body) {

      if(error) {

        console.log(error);
      } else {

        console.log(response);
      }
    })

    res.json({})

});

module.exports = router;

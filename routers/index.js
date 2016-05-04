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
            "fallback": "New open task [Urgent]: <http://url_to_task|Test out Slack message attachments>",
            "pretext": "New open task [Urgent]: <http://url_to_task|Test out Slack message attachments>",
            "color": "#fc6d26",
            "fields": [{
                "title": "Notes",
                "value": "This is much easier than I thought it would be.",
                "short": false
            }]
        }]
    }
    // if (req.body.ref === 'refs/heads/master') {
    //
    //   request.post('https://hooks.slack.com/services/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', {
    //       text: req.body.ref
    //   })
    // } else {
    //
    //     request.post('https://hooks.slack.com/services/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', {
    //         text: req.body.ref
    //     })
    // }

    console.log(req.body);
    var message = req.body.ref;

    request({
      method: 'POST',
      // url: 'http://localhost:8080/message',
      url: 'https://hooks.slack.com/services/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',
      json: messageBody,
      // multipart: [
      //   {
      //     'content-type': 'application/json',
      //     'Host': 'hooks.slack.com',
      //     'Cache-Control': 'no-cache',
      //   }
      // ]
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

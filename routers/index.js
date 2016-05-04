var express = require('express');
var request = require('request');

var router = express.Router();

router.get('/', function(req, res) {

    res.json({
        message: 'ok'
    });
});

router.post('/', function(req, res) {

    var message = {}

    if (req.body.ref.split('/')[2] === 'master') {

      var messageBody = {
          "attachments": [{
              "fallback": req.body.user_name + ' ' + req.body.event_name + ' <' + req.body.project.web_url + '/commits/' + req.body.ref.split('/')[2] + '|' + req.body.ref.split('/')[2] + '> of <' + req.body.project.web_url + '|' + req.body.project.name + '>',
              "pretext": req.body.user_name + ' ' + req.body.event_name + ' <' + req.body.project.web_url + '/commits/' + req.body.ref.split('/')[2] + '|' + req.body.ref.split('/')[2] + '> of <' + req.body.project.web_url + '|' + req.body.project.name + '>',
              "color": "#fc6d26",
              // "fields": [{
              //     "title": "Notes",
              //     "value": "This is much easier than I thought it would be.",
              //     "short": false
              // }]
              "fields": []
          }]
      }

      req.body.commits.forEach(function(item) {

        messageBody.attachments[0].fields.push({ value: "<" + item.url + "|" + String(item.id).substring(0, 6) + "> : " + item.message })
        messageBody.attachments[0].fields.push({ value: "-" + item.author.name })
        messageBody.attachments[0].fields.push({ value: "---" })
      })

      console.log(messageBody.attachments[0].fields);

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

        console.log(body);
      }
    })

    res.json({})

});

module.exports = router;

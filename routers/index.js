var express = require('express');
var request = require('request');

var router = express.Router();

router.get('/', function(req, res) {

    res.json({
        message: 'ok'
    });
});

router.post('/', function(req, res) {

    //Branch name equal master
    if (req.body.ref.split('/')[2] === 'master') {

      var messageBody = {
          "attachments": [{
              "fallback": req.body.user_name + ' ' + req.body.event_name + 'ed to branch <' + req.body.project.web_url + '/commits/' + req.body.ref.split('/')[2] + '|' + req.body.ref.split('/')[2] + '> of <' + req.body.project.web_url + '|' + req.body.project.name + '>',
              "pretext": req.body.user_name + ' ' + req.body.event_name + 'ed to branch <' + req.body.project.web_url + '/commits/' + req.body.ref.split('/')[2] + '|' + req.body.ref.split('/')[2] + '> of <' + req.body.project.web_url + '|' + req.body.project.name + '>',
              "color": "#333c47",
              "fields": []
          }]
      }

      req.body.commits.forEach(function(item, index) {

        messageBody.attachments[0].fields.push({ value: '\n-' })
        messageBody.attachments[0].fields.push({ value: "<" + item.url + "|" + String(item.id).substring(0, 6) + "> : " + item.message, short: true })
        messageBody.attachments[0].fields.push({ value: "author: " + item.author.name })

        if(req.body.commits.length - 1 == index) {

          messageBody.attachments[0].fields.push({ value: '\n-' })
        }
      })

      request({
        method: 'POST',
        url: '${YOUR_SLACK_INCOMING_WEBHOOK_URL}',
        json: messageBody
      }, function(error, response, body) {

        if(error) {

          console.log(error);
        } else {

          console.log(body);
        }
      })
    }

    res.json({})
});

module.exports = router;

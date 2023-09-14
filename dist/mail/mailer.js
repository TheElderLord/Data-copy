"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _bluebird = require("bluebird");
var _ref;
var nodemailer = require("nodemailer");
var _require = require("../constants"),
  mail_user = _require.mail_user,
  mail_password = _require.mail_password;
var mailer = function mailer(_x, _x2) {
  return (_ref = _ref || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee(text, receivents) {
    var transporter, mailOptions;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          try {
            console.log("Mailer");
            transporter = nodemailer.createTransport({
              service: "Gmail",
              auth: {
                user: mail_user,
                pass: mail_password
              }
            });
            mailOptions = {
              from: "Sitcenter KGD",
              to: receivents.join(", "),
              subject: "SITCENTER KGD",
              text: text
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.error("Error sending email:", error);
              } else {
                console.log("Email sent:", info.response);
              }
            });
          } catch (error) {
            console.error('Error:', error);
          }
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }))).apply(this, arguments);
};
module.exports = mailer;
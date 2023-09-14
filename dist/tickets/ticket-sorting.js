"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _bluebird = require("bluebird");
var _ref;
// const fetch_ticket = require("./all-tickets");

var sortByState = function sortByState(_x) {
  return (_ref = _ref || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee3(tickets) {
    var _ref2;
    var warning;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          console.log("Sort by state started");
          // const tickets = await fetch_ticket();
          warning = []; // console.log(tickets);
          tickets.forEach(function (_x2) {
            return (_ref2 = _ref2 || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee2(element) {
              var _ref3;
              return _regenerator["default"].wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    try {
                      element.forEach(function (_x3) {
                        return (_ref3 = _ref3 || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee(element) {
                          return _regenerator["default"].wrap(function _callee$(_context) {
                            while (1) switch (_context.prev = _context.next) {
                              case 0:
                                if (element.ServOver == "true" || element.WaitOver == "true" || element.Rating == "1" || element.Rating == "2") {
                                  warning.push(element);
                                }
                              case 1:
                              case "end":
                                return _context.stop();
                            }
                          }, _callee);
                        }))).apply(this, arguments);
                      });
                    } catch (error) {
                      console.log(error);
                    }
                  case 1:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }))).apply(this, arguments);
          });
          return _context3.abrupt("return", warning);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }))).apply(this, arguments);
};
module.exports = sortByState;
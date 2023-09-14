"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _bluebird = require("bluebird");
var _compareAndDelete;
var axios = require("axios");
var xml2js = require("xml2js");
var _require = require("../constants"),
  total_ticket = _require.total_ticket;
function compareAndDelete(_x, _x2) {
  return (_compareAndDelete = _compareAndDelete || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee3(online, sitpool) {
    var _ref;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return Promise.all(online.map(function (_x3) {
            return (_ref = _ref || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee2(element) {
              var url, soapResponse, xml, parseOptions;
              return _regenerator["default"].wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!(element === undefined || element === null)) {
                      _context2.next = 2;
                      break;
                    }
                    return _context2.abrupt("return");
                  case 2:
                    url = "http://".concat(element.F_IP_ADDRESS, ":3856");
                    _context2.prev = 3;
                    _context2.next = 6;
                    return axios.post(url, total_ticket, {
                      headers: {
                        "Content-Type": "text/xml"
                      }
                    });
                  case 6:
                    soapResponse = _context2.sent;
                    xml = soapResponse.data;
                    parseOptions = {
                      explicitArray: false,
                      explicitCharkey: true,
                      trim: true,
                      attrkey: "@",
                      charkey: "#"
                    };
                    xml2js.parseString(xml, parseOptions, function (err, result) {
                      var _ref2;
                      if (err) {
                        console.error("Error parsing XML:", err);
                        reject(err);
                        return;
                      }
                      var fullTicketElements = result["soapenv:Envelope"]["soapenv:Body"]["cus:NomadAllTicketList"]["xsd:complexType"][1]["xsd:element"];
                      if (!fullTicketElements) {
                        return;
                      }
                      fullTicketElements.map(function (_x4) {
                        return (_ref2 = _ref2 || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee(el) {
                          var ticket, sql, result, deleteQuery;
                          return _regenerator["default"].wrap(function _callee$(_context) {
                            while (1) switch (_context.prev = _context.next) {
                              case 0:
                                ticket = el["@"]["EventId"];
                                sql = "SELECT eventid FROM facts WHERE eventid = '".concat(ticket, "' and idbranch = ").concat(element.f_id);
                                _context.next = 4;
                                return sitpool.query(sql);
                              case 4:
                                result = _context.sent;
                                if (!(result[0].length === 0)) {
                                  _context.next = 11;
                                  break;
                                }
                                deleteQuery = "DELETE FROM tickets WHERE eventid = '".concat(ticket, "'");
                                _context.next = 9;
                                return sitpool.query(deleteQuery);
                              case 9:
                                console.log("Deleted ticket");
                                return _context.abrupt("return");
                              case 11:
                              case "end":
                                return _context.stop();
                            }
                          }, _callee);
                        }))).apply(this, arguments);
                      });
                    });
                    _context2.next = 16;
                    break;
                  case 12:
                    _context2.prev = 12;
                    _context2.t0 = _context2["catch"](3);
                    console.error("Error fetching and inserting data:", _context2.t0);
                    throw _context2.t0;
                  case 16:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2, null, [[3, 12]]);
            }))).apply(this, arguments);
          }));
        case 2:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }))).apply(this, arguments);
}
module.exports = compareAndDelete;
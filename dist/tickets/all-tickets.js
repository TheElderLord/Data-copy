"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _bluebird = require("bluebird");
var _fetchTickets;
var xml2js = require("xml2js");
var axios = require("axios");
var _require = require("../constants"),
  all_ticket = _require.all_ticket;

// const server_sorting = require("../server/server-sorting");
function fetchTickets(_x) {
  return (_fetchTickets = _fetchTickets || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee2(online) {
    var _ref;
    var tickets;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          //fethes all tickets from all servers, returns array of objects,each object are tickets from one server
          console.log("Fetch tickets started");
          tickets = []; // const { online } = await server_sorting();
          _context2.next = 4;
          return Promise.all(online.map(function (_x2) {
            return (_ref = _ref || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee(element) {
              var url, soapResponse, xml, parseOptions;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    if (!(element === undefined || element === null)) {
                      _context.next = 2;
                      break;
                    }
                    return _context.abrupt("return");
                  case 2:
                    url = "http://".concat(element.F_IP_ADDRESS, ":3856");
                    _context.prev = 3;
                    _context.next = 6;
                    return axios.post(url, all_ticket, {
                      headers: {
                        "Content-Type": "text/xml"
                      }
                    });
                  case 6:
                    soapResponse = _context.sent;
                    xml = soapResponse.data;
                    parseOptions = {
                      explicitArray: false,
                      explicitCharkey: true,
                      trim: true,
                      attrkey: "@",
                      charkey: "#"
                    };
                    xml2js.parseString(xml, parseOptions, function (err, result) {
                      if (err) {
                        console.error("Error parsing XML:", err);
                        reject(err);
                        return;
                      }
                      var fullTicketElements = result["soapenv:Envelope"]["soapenv:Body"]["cus:NomadAllTicketList"]["xsd:complexType"][1]["xsd:element"];
                      if (!fullTicketElements) {
                        return;
                      }
                      // console.log('Tickets',fullTicketElements);
                      if (Array.isArray(fullTicketElements)) {
                        var extractedTickets = fullTicketElements.map(function (element) {
                          return element["@"];
                        });
                        tickets.push(extractedTickets);
                        // console.log('Tickets:', extractedTickets);
                        // resolve(extractedTickets);
                      } else {
                        var singleTicket = fullTicketElements["@"];
                        tickets.push(singleTicket);
                        // console.log('Ticket:', singleTicket["@"]["EventId"]);
                        // resolve(singleTicket);
                      }
                    });
                    _context.next = 16;
                    break;
                  case 12:
                    _context.prev = 12;
                    _context.t0 = _context["catch"](3);
                    console.error("Error fetching and inserting data:", _context.t0);
                    throw _context.t0;
                  case 16:
                  case "end":
                    return _context.stop();
                }
              }, _callee, null, [[3, 12]]);
            }))).apply(this, arguments);
          }));
        case 4:
          return _context2.abrupt("return", tickets);
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }))).apply(this, arguments);
}
module.exports = fetchTickets;
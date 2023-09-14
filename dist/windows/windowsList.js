"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _bluebird = require("bluebird");
var _fetchWindows;
var xml2js = require("xml2js");
var axios = require("axios");
var _require = require("../constants"),
  window_list = _require.window_list;
function fetchWindows(_x) {
  return (_fetchWindows = _fetchWindows || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee2(online) {
    var _ref;
    var windowList;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          console.log('Fetching windows...');
          // const {online} = await server_sorting();
          windowList = [];
          _context2.next = 4;
          return Promise.all(online.map(function (_x2) {
            return (_ref = _ref || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee(element) {
              var url, soapResponse, xml, parseOptions;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    // console.log(element.F_IP_ADDRESS);
                    url = "http://".concat(element.F_IP_ADDRESS, ":3856");
                    _context.prev = 1;
                    _context.next = 4;
                    return axios.post(url, window_list, {
                      headers: {
                        "Content-Type": "text/xml"
                      }
                    });
                  case 4:
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
                        console.error("Error parsing XML:");
                        reject(err);
                        return;
                      }
                      var windows = result["soapenv:Envelope"]["soapenv:Body"]["cus:NomadWindowList"]["xsd:complexType"][1]["xsd:element"];
                      var extractedWindows = windows.map(function (element) {
                        return element["@"];
                      });
                      // console.log('Windows:', extractedWindows);
                      windowList.push(extractedWindows);
                    });
                    _context.next = 13;
                    break;
                  case 10:
                    _context.prev = 10;
                    _context.t0 = _context["catch"](1);
                    console.error("Error fetching and inserting data:");
                    // throw error;
                  case 13:
                  case "end":
                    return _context.stop();
                }
              }, _callee, null, [[1, 10]]);
            }))).apply(this, arguments);
          }));
        case 4:
          return _context2.abrupt("return", windowList);
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }))).apply(this, arguments);
}
module.exports = fetchWindows;
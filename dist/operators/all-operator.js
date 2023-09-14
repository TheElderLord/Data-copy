"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _bluebird = require("bluebird");
var _fetchOperator;
var xml2js = require("xml2js");
var axios = require("axios");
var _require = require("../constants"),
  all_operator = _require.all_operator;
// const server_sorting = require("../server/server-sorting");
function fetchOperator(_x) {
  return (_fetchOperator = _fetchOperator || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee2(online) {
    var _ref;
    var operatorArray;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          console.log("Fetching operators...");
          operatorArray = []; // const {online} = await server_sorting();
          _context2.next = 4;
          return Promise.all(online.map(function (_x2) {
            return (_ref = _ref || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee(element) {
              var url, soapResponse, xml, parseOptions;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    url = "http://".concat(element.F_IP_ADDRESS, ":3856");
                    _context.next = 4;
                    return axios.post(url, all_operator, {
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
                        console.error("Error parsing XML:", err);
                        reject(err);
                        return;
                      }
                      var ops = result["soapenv:Envelope"]["soapenv:Body"]["cus:NomadAllOperatorList"]["xsd:complexType"][1]["xsd:element"];
                      var operators = ops.map(function (element) {
                        return element["@"];
                      });
                      // console.log('Operators:', operators);
                      operatorArray.push(operators);
                    });
                    _context.next = 14;
                    break;
                  case 10:
                    _context.prev = 10;
                    _context.t0 = _context["catch"](0);
                    console.error("Error fetching and inserting data:", _context.t0);
                    throw _context.t0;
                  case 14:
                  case "end":
                    return _context.stop();
                }
              }, _callee, null, [[0, 10]]);
            }))).apply(this, arguments);
          }));
        case 4:
          return _context2.abrupt("return", operatorArray);
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }))).apply(this, arguments);
}
module.exports = fetchOperator;
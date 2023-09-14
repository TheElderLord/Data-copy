"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _bluebird = require("bluebird");
var _server_sort;
// const server_fetch = require('./all-server-fetcher');
var _require = require("../constants"),
  all_operator = _require.all_operator;
var axios = require("axios");
var axiosInstance = axios.create({
  timeout: 2000
});
function server_sort(_x) {
  return (_server_sort = _server_sort || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee2(servers) {
    var _ref;
    var online, offline;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          console.log('Server sorting started');
          // const servers = await server_fetch();
          online = [];
          offline = []; // servers.map((server) => {
          //     console.log(server);
          // })
          _context2.next = 5;
          return Promise.all(servers.map(function (_x2) {
            return (_ref = _ref || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee(server) {
              var ip, url, response;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    ip = server.f_ip_address;
                    url = "http://".concat(ip, ":3856");
                    _context.next = 5;
                    return axiosInstance.post(url, all_operator);
                  case 5:
                    response = _context.sent;
                    if (response.status === 200) {
                      // console.log('Online:', server.f_ip_address)
                      online.push(server);
                    } else {
                      // console.log('Offline:', server.f_ip_address)
                      offline.push(server);
                    }
                    _context.next = 12;
                    break;
                  case 9:
                    _context.prev = 9;
                    _context.t0 = _context["catch"](0);
                    // console.error(`Error connecting to ${url}:`, error.message);
                    // console.log('Offline:', server.f_ip_address)
                    offline.push(server);
                  case 12:
                  case "end":
                    return _context.stop();
                }
              }, _callee, null, [[0, 9]]);
            }))).apply(this, arguments);
          }));
        case 5:
          return _context2.abrupt("return", {
            online: online,
            offline: offline
          });
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }))).apply(this, arguments);
}
module.exports = server_sort;
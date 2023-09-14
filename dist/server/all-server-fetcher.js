"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _bluebird = require("bluebird");
//First action to get all servers from NomadDB

// const sql = 'SELECT f_ip_address, F_NAME, f_id, F_PARENT_ID FROM t_g_branch GROUP BY f_ip_address, F_NAME, f_id, F_PARENT_ID';
var sql = "SELECT f_ip_address, MAX(F_NAME) AS F_NAME, MAX(f_id) AS f_id, MAX(F_PARENT_ID) AS F_PARENT_ID\nFROM t_g_branch\nGROUP BY f_ip_address;";
var server_fetch = function server_fetch(pool) {
  var _ref;
  console.log('All Server fetch started');
  return new Promise(function (_x, _x2) { 
    return (_ref = _ref || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve, reject) {
      var _yield$pool$query, _yield$pool$query2, rows, fields, servers;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return pool.query(sql);
          case 3:
            _yield$pool$query = _context.sent;
            _yield$pool$query2 = (0, _slicedToArray2["default"])(_yield$pool$query, 2);
            rows = _yield$pool$query2[0];
            fields = _yield$pool$query2[1];
            if (!(!rows || rows.length === 0)) {
              _context.next = 10;
              break;
            }
            resolve([]); // No results, return an empty array
            return _context.abrupt("return");
          case 10:
            // console.log('Rows:', rows);
            servers = rows.filter(function (element) {
              return element.f_ip_address !== null && element.f_ip_address !== '' && element.f_ip_address !== undefined && element.f_ip_address !== 'null';
            }).map(function (element) {
              try {
                if (element.F_NAME !== null && element.F_NAME !== undefined) {
                  //kgd  
                  var val = element.F_NAME.split(';')[1].replace('RU=', '');
                  //tenge 
                  //    const val = element.F_NAME.replace('RU=', ''); 

                  element.F_NAME = val;
                  return element;
                }
              } catch (error) {
                return null;
              }
              // console.log(element);
            }).filter(function (element) {
              return element !== null;
            }); // Filter out null elements
            resolve(servers);
            _context.next = 17;
            break;
          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            reject(_context.t0);
          case 17:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 14]]);
    }))).apply(this, arguments);
  });
};
module.exports = server_fetch;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _bluebird = require("bluebird");
var _ref;
// const all_tickets = require('./server-fetch/all-tickets');
// const createConnectionPool = require("../SitDB");
// const pool = createConnectionPool();

var insertTickets = function insertTickets(_x, _x2) {
  return (_ref = _ref || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee2(tickets, pool) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          console.log("Insert tickets started");

          // const tickets = await all_tickets();
          // console.log(tickets[0].length);
          // tickets.map(element => {
          //     console.log(element);
          // })
          tickets.foreach(function (element) {
            try {
              var _ref2;
              // console.log(element);

              // String eventIdString = getStringFromXML(node,"EventId");
              // String ticketNumString = getStringFromXML(node,"TicketNo");
              // String startTimeString = getStringFromXML(node,"StartTime");
              // String serviceString = getStringFromXML(node,"ServiceName");
              // String IIN =getStringFromXML(node,"IIN");
              // String redirected = getStringFromXML(node,"Redirected");
              // String targetOperatorId = getStringFromXML(node,"TargetOperatorId");
              // String stateString = getStringFromXML(node,"State");
              // String servOver = getStringFromXML(node,"ServOver");
              // String waitOver = getStringFromXML(node,"WaitOver");
              // String startServTime = getStringFromXML(node,"StartServTime");
              // String stopServTime =getStringFromXML(node,"StopservTime");
              // String addStatus =getStringFromXML(node,"AdditionalStatus");
              // String operator =getStringFromXML(node,"Operator");
              // String windowNum =getStringFromXML(node,"WindowNum");
              // String roleString =getStringFromXML(node,"RoleString");
              // String autocode =getStringFromXML(node,"Autocode");
              // String idOperator =getStringFromXML(node,"IdOperator");
              // String idQueue =getStringFromXML(node,"IdQueue");
              // String rating = getStringFromXML(node,"Rating");
              // String opinion = getStringFromXML(node,"Opinion");
              // String idBranch =getStringFromXML(node,"IdBranch");
              // String preServOver =getStringFromXML(node,"PreServOver");
              // String preWaitOver =getStringFromXML(node,"PreWaitOver");

              // updateQuery+= "ticketno=\'"+t.getTicketno()+"\', starttime=\'"+t.getStartTime()+"\', iin=\'"+
              // t.getIin()+"\', " + "redirected=\'"+t.isRedirected()+"\', " + "targetoperatorid=\'"+t.getTargetId()+"\', state=\'"+t.getState()+"\', " +
              // "servover=\'"+t.isServOver()+"\', waitover=\'"+t.isWaitOver()+"\', startservtime=\'"+t.getStartServTime()+"\', " +
              // "stopservtime=\'"+t.getStopServTime()+ "\', additionalstatus=\'"+t.getAdditionalStatus()+"\', operator=\'"+t.getOperator()+"\', " +
              // "windownum=\'"+t.getWindownum()+"\', rolestring=\'"+t.getRoleString()+"\', autocode=\'"+t.getAutocode()+
              // "\', idoperator=\'"+t.getIdoperator()+"\', idqueue=\'"+t.getIdqueue()+"\', rating=\'"+t.getRating()+"\', opinion=\'"+t.getOpinion()+"\', " +
              // "servicename=\'"+t.getServicename()+"\', picnum=\'"+t.getPicnum()+"\', " +
              //  "last=\'"+t.getLast()+"\', PreServOver=\'"+t.isPreServOver()+"\', PreWaitOver=\'"+t.isPreWaitOver()+"\'" +
              // " where "+ "eventid= \'"+t.getEventid()+"\' and " +"idbranch=\'"+t.getBranch_id()+"\'; " ;

              // insertQuery+= "eventid= \'"+t.getEventid()+"\', ticketno=\'"+t.getTicketno()+"\', starttime=\'"+t.getStartTime()+"\', iin=\'"+
              //                   t.getIin()+"\', " + "redirected=\'"+t.isRedirected()+"\', " + "targetoperatorid=\'"+t.getTargetId()+"\', state=\'"+t.getState()+"\', " +
              //                   "servover=\'"+t.isServOver()+"\', waitover=\'"+t.isWaitOver()+"\', startservtime=\'"+t.getStartServTime()+"\', " +
              //                   "stopservtime=\'"+t.getStopServTime()+ "\', additionalstatus=\'"+t.getAdditionalStatus()+"\', operator=\'"+t.getOperator()+"\', " +
              //                   "windownum=\'"+t.getWindownum()+"\', rolestring=\'"+t.getRoleString()+"\', autocode=\'"+t.getAutocode()+
              //                   "\', idoperator=\'"+t.getIdoperator()+"\', idqueue=\'"+t.getIdqueue()+"\', rating=\'"+t.getRating()+"\', opinion=\'"+t.getOpinion()+"\', " +
              //                   "idbranch=\'"+t.getBranch_id()+"\', " + "servicename=\'"+t.getServicename()+"\', picnum=\'"+t.getPicnum()+"\', " +
              //                   "time=\'"+t.getTime()+"\', " + "last=\'"+t.getLast()+"\', PreServOver=\'"+t.isPreServOver()+"\', PreWaitOver=\'"+t.isPreWaitOver()+"\'";

              element.foreach(function (_x3) {
                return (_ref2 = _ref2 || (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee(ticket) {
                  var sql, res, currentDate, formattedDate, insert, update;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        // console.log(i);
                        sql = "SELECT * FROM facts WHERE eventid = '".concat(ticket.EventId, "' ");
                        _context.next = 3;
                        return pool.query(sql);
                      case 3:
                        res = _context.sent;
                        currentDate = new Date();
                        formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' '); // console.log(res[0][0].state);
                        console.log(ticket.EventId);
                        console.log(res[0].length);
                        if (!(res[0].length === 1)) {
                          _context.next = 10;
                          break;
                        }
                        return _context.abrupt("return");
                      case 10:
                        if (!(res[0].length === 0)) {
                          _context.next = 17;
                          break;
                        }
                        insert = "Insert into facts(eventid,ticketno,starttime, iin,\n            redirected, targetoperatorid,state,servover,waitover,startservtime,stopservtime, additionalstatus,operator,\n            windownum,rolestring,autocode,idoperator, idqueue, rating,opinion,idbranch,servicename,picnum,time,last,PreServOver,PreWaitOver,ServSent,\n            WaitSent,RatingSent) values('".concat(ticket.EventId, "','").concat(ticket.TicketNo, "','").concat(ticket.StartTime, "','").concat(ticket.IIN, "',\n            '").concat(ticket.Redirected, "','").concat(ticket.TargetOperatorId, "','").concat(ticket.State, "','").concat(ticket.ServOver, "','").concat(ticket.WaitOver, "','").concat(ticket.StartServTime, "',\n            '").concat(ticket.StopservTime, "','").concat(ticket.AdditionalStatus, "','").concat(ticket.Operator, "','").concat(ticket.WindowNum, "','").concat(ticket.RoleString, "','").concat(ticket.Autocode, "',\n            '").concat(ticket.IdOperator, "','").concat(ticket.IdQueue, "','").concat(ticket.Rating, "','").concat(ticket.Opinion, "','").concat(ticket.IdBranch, "','").concat(ticket.ServiceName, "','").concat(getRandomInt(3, 13), "',\n            '").concat(formattedDate, "','0','").concat(ticket.PreServOver, "','").concat(ticket.PreWaitOver, "','0','0','0')");
                        _context.next = 14;
                        return pool.query(insert);
                      case 14:
                        console.log("New ticket inserted");
                        _context.next = 26;
                        break;
                      case 17:
                        if (!(res[0][0].state === ticket.State)) {
                          _context.next = 21;
                          break;
                        }
                        console.log("Ticket is up-to-date");
                        _context.next = 26;
                        break;
                      case 21:
                        if (!(res[0][0].state === "NEW" && ticket.State === "COMPLETED")) {
                          _context.next = 26;
                          break;
                        }
                        update = "UPDATE facts SET  state = '".concat(ticket.State, "' WHERE eventid = '").concat(ticket.EventId, "' and idbranch = '").concat(ticket.IdBranch, "'");
                        _context.next = 25;
                        return pool.query(update);
                      case 25:
                        console.log("Ticket updated");
                      case 26:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }))).apply(this, arguments);
              });
            } catch (error) {
              console.log(error);
            }
          });
        case 2:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }))).apply(this, arguments);
};
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
module.exports = insertTickets;
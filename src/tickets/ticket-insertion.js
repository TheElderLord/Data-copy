// const all_tickets = require('./server-fetch/all-tickets');
// const createConnectionPool = require("../SitDB");
// const pool = createConnectionPool();


const insertTickets = async (tickets, pool) => {
  console.log("Insert tickets started");
  
  // const tickets = await all_tickets();
  // console.log(tickets[0].length);
  // tickets.map(element => {
  //     console.log(element);
  // })
  tickets.foreach((element) => {
    try {
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

      element.foreach(async (ticket) => {
        // console.log(i);

        const sql = `SELECT * FROM facts WHERE eventid = '${ticket.EventId}' `;
        const res = await pool.query(sql);
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');        
        // console.log(res[0][0].state);
        console.log(ticket.EventId);
        console.log(res[0].length);
        if(res[0].length === 1){
          return;
        }
        if (res[0].length === 0) {
          const insert = `Insert into facts(eventid,ticketno,starttime, iin,
            redirected, targetoperatorid,state,servover,waitover,startservtime,stopservtime, additionalstatus,operator,
            windownum,rolestring,autocode,idoperator, idqueue, rating,opinion,idbranch,servicename,picnum,time,last,PreServOver,PreWaitOver,ServSent,
            WaitSent,RatingSent) values('${ticket.EventId}','${ticket.TicketNo}','${ticket.StartTime}','${ticket.IIN}',
            '${ticket.Redirected}','${ticket.TargetOperatorId}','${ticket.State}','${ticket.ServOver}','${ticket.WaitOver}','${ticket.StartServTime}',
            '${ticket.StopservTime}','${ticket.AdditionalStatus}','${ticket.Operator}','${ticket.WindowNum}','${ticket.RoleString}','${ticket.Autocode}',
            '${ticket.IdOperator}','${ticket.IdQueue}','${ticket.Rating}','${ticket.Opinion}','${ticket.IdBranch}','${ticket.ServiceName}','${getRandomInt(3, 13)}',
            '${formattedDate}','0','${ticket.PreServOver}','${ticket.PreWaitOver}','0','0','0')`;
          await pool.query(insert);
          console.log("New ticket inserted");
          
        } else {
          if (res[0][0].state === ticket.State) {
            console.log("Ticket is up-to-date");
            
          } else if (
            res[0][0].state === "NEW" &&
            ticket.State === "COMPLETED"
          ) {
            const update = `UPDATE facts SET  state = '${ticket.State}' WHERE eventid = '${ticket.EventId}' and idbranch = '${ticket.IdBranch}'`;
            await pool.query(update);
            console.log("Ticket updated");
           
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  })
};
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = insertTickets;

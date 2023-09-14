// const user_fetcher = require('../users/user-fetcher');
// const ticket_sorting = require('./ticket-sorting');
// const mail = require('../mail/mailer');



const sendTickets = async (users, warning, mail,pool) => {
  // const warning = await ticket_sorting();
  // const users = await user_fetcher();
  warning.forEach(async(element) => {
    try {
      users.forEach(async(user) => {
        if (user.id_branch === element.IdBranch) {
          if (element.WaitOver) {
            mail(user.email, "WaitOver", element);
            const sql = `UPDATE facts SET WaitSent = 1 WHERE eventid = ${element.EventId}`;
            await pool.query(sql);
          }
          if (element.ServOver) {
            mail(user.email, "ServOver", element);
            const sql = `UPDATE facts SET ServSent = 1 WHERE eventid = ${element.EventId}`;
            await pool.query(sql);
          }
          if (element.Rating == "1" || element.Rating == "2") {
            mail(user.email, "Bad rating", element);
            const sql = `UPDATE facts SET RatingSent = 1 WHERE eventid = ${element.EventId}`;
            await pool.query(sql);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = sendTickets;

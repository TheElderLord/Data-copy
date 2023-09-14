"use strict";

var dotenv = require("dotenv");
dotenv.config();
module.exports = {
  url: process.env.NOMAD_SERVER_URL,
  all_ticket: process.env.SOAP_ALL_TICKETLIST,
  all_operator: process.env.SOAP_ALL_OPERATORLIST,
  window_list: process.env.SOAP_WINDOW_LIST,
  event_confirm: process.env.SOAP_EVENT_CONFIRM,
  total_ticket: process.env.SOAP_TOTAL_TICKETLIST,
  nomad_host: process.env.NOMAD_HOST,
  nomad_user: process.env.NOMAD_USER,
  nomad_password: process.env.NOMAD_PASS,
  nomad_database: process.env.NOMAD_DB,
  nomad_port: process.env.NOMAD_PORT,
  sit_host: process.env.SIT_HOST,
  sit_user: process.env.SIT_USER,
  sit_password: process.env.SIT_PASS,
  sit_database: process.env.SIT_DB,
  sit_port: process.env.SIT_PORT,
  mail_user: process.env.MAIL_USER,
  mail_password: process.env.MAIL_PASS
};
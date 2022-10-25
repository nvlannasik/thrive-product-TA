const winston = require("winston");
const { format } = winston;
var winstonFastRabbitMq = require("winston-fast-rabbitmq");
require("dotenv").config();

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const logstashConfig = {
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf((msg) => {
      return `${msg.timestamp} - [${msg.level}] ${msg.message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winstonFastRabbitMq({
      host: process.env.RABBITMQ_HOST,
      port: process.env.RABBITMQ_PORT,
      username: process.env.RABBITMQ_USERNAME,
      password: process.env.RABBITMQ_PASSWORD,
      exchange: process.env.RABBITMQ_EXCHANGE,
      routingKey: process.env.RABBITMQ_ROUTINGKEY,
      queue: process.env.RABBITMQ_QUEUE,
      vhost: process.env.RABBITMQ_VHOST,
      silent: true,
    }),
  ],
};

const logger = new winston.createLogger(logstashConfig);

module.exports = logger;

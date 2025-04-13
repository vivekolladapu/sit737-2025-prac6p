const express = require('express');
const winston = require('winston');
const app = express();
const port = 3020;

// Winston Logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'extended-calculator-microservice' },
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Function to validate num1 and num2
const validateNumbers = (req, res, next) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = req.query.num2 !== undefined ? parseFloat(req.query.num2) : undefined;

  if (isNaN(num1) || (req.query.num2 !== undefined && isNaN(num2))) {
    const message = 'Both num1 and num2 must be valid numbers';
    logger.error(message);
    return res.status(400).json({ error: message });
  }

  req.num1 = num1;
  req.num2 = num2;
  next();
};

// Addition operation
app.get('/add', validateNumbers, (req, res) => {
  try {
    const result = req.num1 + req.num2;
    logger.info(`Addition: ${req.num1} + ${req.num2} = ${result}`);
    res.json({ result });
  } catch (err) {
    logger.error(`Addition Error: ${err.message}`);
    res.status(500).json({ error: 'Error during addition' });
  }
});

// Subtraction operation
app.get('/subtract', validateNumbers, (req, res) => {
  try {
    const result = req.num1 - req.num2;
    logger.info(`Subtraction: ${req.num1} - ${req.num2} = ${result}`);
    res.json({ result });
  } catch (err) {
    logger.error(`Subtraction Error: ${err.message}`);
    res.status(500).json({ error: 'Error during subtraction' });
  }
});

// Multiplication operation
app.get('/multiply', validateNumbers, (req, res) => {
  try {
    const result = req.num1 * req.num2;
    logger.info(`Multiplication: ${req.num1} * ${req.num2} = ${result}`);
    res.json({ result });
  } catch (err) {
    logger.error(`Multiplication Error: ${err.message}`);
    res.status(500).json({ error: 'Error during multiplication' });
  }
});

// Division operation
app.get('/divide', validateNumbers, (req, res) => {
  try {
    if (req.num2 === 0) {
      const message = 'Division by zero is not allowed';
      logger.error(message);
      return res.status(400).json({ error: message });
    }
    const result = req.num1 / req.num2;
    logger.info(`Division: ${req.num1} / ${req.num2} = ${result}`);
    res.json({ result });
  } catch (err) {
    logger.error(`Division Error: ${err.message}`);
    res.status(500).json({ error: 'Error during division' });
  }
});
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Exponentiation operation
app.get('/power', validateNumbers, (req, res) => {
  try {
    const result = Math.pow(req.num1, req.num2);
    logger.info(`Exponentiation: ${req.num1} ^ ${req.num2} = ${result}`);
    res.json({ result });
  } catch (err) {
    logger.error(`Power Error: ${err.message}`);
    res.status(500).json({ error: 'Error during exponentiation' });
  }
});

// Modulo operation
app.get('/mod', validateNumbers, (req, res) => {
  try {
    const result = req.num1 % req.num2;
    logger.info(`Modulo: ${req.num1} % ${req.num2} = ${result}`);
    res.json({ result });
  } catch (err) {
    logger.error(`Modulo Error: ${err.message}`);
    res.status(500).json({ error: 'Error during modulo operation' });
  }
});

// Square Root operation, which will only use num
app.get('/sqrt', (req, res) => {
  const num = parseFloat(req.query.num);
  if (isNaN(num)) {
    const message = 'Invalid input: num must be a valid number';
    logger.error(message);
    return res.status(400).json({ error: message });
  }
  if (num < 0) {
    const message = 'Invalid input: Cannot calculate square root of a negative number';
    logger.error(message);
    return res.status(400).json({ error: message });
  }

  try {
    const result = Math.sqrt(num);
    logger.info(`Square Root: sqrt(${num}) = ${result}`);
    res.json({ result });
  } catch (err) {
    logger.error(`Square Root Error: ${err.message}`);
    res.status(500).json({ error: 'Error during square root calculation' });
  }
});



// Global Error Handler
app.use((err, req, res, next) => {
  logger.error(`Unhandled error: ${err.message}`);
  res.status(500).json({ error: 'An unexpected error occurred.' });
});

// Starting Server
app.listen(port, () => {
  logger.info(`Calculator microservice running at http://localhost:${port}`);
});

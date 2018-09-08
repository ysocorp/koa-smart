import chalk from 'chalk';
import moment from 'moment';

function dateFormat(date) {
  return moment(date).format('YYYY/MM/DD, h:mm:ss a');
}

function getColor(status) {
  if (status < 400) {
    return 'green';
  } else if (status < 500) {
    return 'gray';
  }
  return 'red';
}

async function logger(ctx, next) {
  const start = new Date();
  let status = 500;
  try {
    // eslint-disable-next-line
    console.log(
      `${chalk.blue(dateFormat(start))} - ${chalk.bold(ctx.method)} ${chalk.blue.bold(ctx.url)} START`
    );
    await next();
    status = ctx.status;
  } catch (err) {
    let msg = err;

    const arraySequelize = ['SequelizeValidationError', 'SequelizeUniqueConstraintError'];
    if (err.constructor.name === 'ErrorApp') {
      msg = `${err.status}: ${err.message || JSON.stringify(err.messages)}`;
      status = err.status;
    }
    if (arraySequelize.includes(err.name)) {
      msg = `${err.name}: ${err.message}`;
      status = 400;
    }
    // eslint-disable-next-line
    console.log(chalk.red('[ERROR]'), `${chalk.red.bold(ctx.method)} ${ctx.url}`, msg.toString());
    throw err;
  } finally {
    const ms = new Date() - start;
    const fColor = chalk[getColor(status)];
    // eslint-disable-next-line
    console.log(
      `${fColor(dateFormat(new Date()))} - ${fColor.bold(status)} ${chalk.bold(ctx.method)} ${
        ctx.url
      } - ${fColor(ms + ' ms')}`
    );
  }
}

/**
 * @desc middleware handling logging each time a request is made
 */
export default () => logger;

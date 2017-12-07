import chalk from 'chalk';
import moment from 'moment';
import ErrorApp from '../utils/ErrorApp';

function dateFormat(date) {
  return moment(date).format('YYYY/MM/DD, h:mm:ss a')
}

function getColor(status) {
  if (status < 400) {
    return 'green';
  } else if (status < 500) {
    return 'gray';
  }
  return 'red'
}

async function logger(ctx, next) {
  const start = new Date();
  try {
    console.log(`${chalk.blue(dateFormat(start))} - ${chalk.bold(ctx.method)} ${chalk.blue.bold(ctx.url)} START`);
    await next();
  } catch (err) {
    let msg = err;

    const arraySequelize = ['SequelizeValidationError', 'SequelizeUniqueConstraintError'];
    if (err instanceof ErrorApp) {
      msg = `${err.status}: ${err.message}`;
    } if (arraySequelize.includes(err.name)) {
      msg = `${err.name}: ${err.message}`;
    }
    console.error(chalk.red('[ERROR]'), `${chalk.red.bold(ctx.method)} ${ctx.url}`, msg);
  } finally {
    const ms = new Date() - start;
    const fColor = chalk[getColor(ctx.status)];
    console.log(`${fColor(dateFormat(new Date()))} - ${fColor.bold(ctx.status)} ${chalk.bold(ctx.method)} ${ctx.url} - ${fColor(ms + ' ms')}`);
  }
}

export default logger;

// simple node simulator that posts telemetry to backend
const axios = require('axios');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).option('count',{type:'number', default:5}).option('interval',{type:'number', default:5000}).argv;

const BACKEND = process.env.BACKEND || 'http://localhost:4000/api/bins/telemetry';

function randomInt(min,max){ return Math.floor(Math.random()*(max-min+1))+min }

const bins = Array.from({length: argv.count}).map((_,i)=>({binId:`BIN-${1000+i}`, location:`Zone ${i+1}`}))

async function sendRandom(){
  const b = bins[randomInt(0,bins.length-1)]
  const fill = randomInt(0,100)
  const status = fill>90? 'MAINTENANCE' : 'OK'
  try{
    await axios.post(BACKEND, { binId: b.binId, fillLevel: fill, status, location: b.location })
    console.log('sent', b.binId, fill)
  }catch(err){ console.error('err', err.message) }
}

setInterval(sendRandom, argv.interval)
console.log('Simulator started — sending', argv.count, 'bins every', argv.interval, 'ms')

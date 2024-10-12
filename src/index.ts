import express from 'express';
import { createCanvas } from 'canvas';

const app = express();

const piDigitCount = 1000;
let pi = '';

let calculationTable = new Array(Math.ceil(10*piDigitCount/3)).fill(2);

app.get('/pi-visitor', (req, res) => {
  // https://www.cs.williams.edu/~heeringa/classes/cs135/s15/readings/spigot.pdf
  calculationTable = calculationTable.map(digit => digit * 10);

  for(let i = calculationTable.length - 1; i > 0; i--) {
    const num = i;
    const den = 2*(i+1) - 1;

    const q = ~~(calculationTable[i]/den);
    const r = calculationTable[i] % den;

    calculationTable[i] = r;
    calculationTable[i - 1] += q * num;
  }

  if(pi.length == 1)
  {
    pi += '.';
  }

  pi += Math.floor(calculationTable[0] / 10);

  calculationTable[0] = calculationTable[0] % 10;

  const canvas = createCanvas(1000, 500, 'svg');

  res.send(canvas.toBuffer());
});

app.listen(process.env.PORT || 3000);
#!/usr/bin/env node
/**
 * CE3X-AI Validation Script
 * Compares algorithm output against real certification data from Madrid
 */

const fs = require('fs');

// Load validation cases
const cases = JSON.parse(fs.readFileSync('./validation_cases.json', 'utf8'));

// CE3X-AI Algorithm (UPDATED - calibrated from real data)
const BASE_CONSUMPTION = 180;  // D3 piso gas 2000s average
const CO2_FACTOR = 0.208;
const PRICE_KWH = 0.18;

const factors = {
    climate: { 'D3': 1.0 },
    year: (y) => {
        if (y < 1960) return 1.35;
        if (y < 1970) return 1.33;
        if (y < 1980) return 1.27;
        if (y < 1990) return 1.10;
        if (y < 2000) return 1.10;
        if (y < 2010) return 1.00;
        if (y < 2020) return 0.73;
        return 0.50;
    },
    heating: {
        'GasNatural': 1.0,
        'ElectricidadPeninsular': 0.80,
        'GasoleoC': 1.17,
        'GLP': 1.05,
        'BiomasaPellet': 0.50,
        'BiomasaOtros': 0.65,
        'Carbon': 1.20
    },
    type: {
        'piso': 1.0,
        'unifamiliar': 1.17
    }
};

function calculate(c) {
    let consumption = BASE_CONSUMPTION;
    
    // Climate (all D3)
    consumption *= factors.climate['D3'] || 1.0;
    
    // Year
    consumption *= factors.year(c.year);
    
    // Heating (with new normalized factors)
    consumption *= factors.heating[c.calefaccion] || 1.0;
    
    // Type (piso is now base, unifamiliar adds)
    consumption *= factors.type[c.tipo] || 1.0;
    
    // Note: we don't have construction details (aislamiento, ventanas, etc) in dataset
    // so we assume "typical" for the era = 1.0
    
    return Math.round(consumption);
}

function getLetter(consumption) {
    if (consumption < 44.6) return 'A';
    if (consumption < 72.3) return 'B';
    if (consumption < 112.1) return 'C';
    if (consumption < 172.3) return 'D';
    if (consumption < 303.7) return 'E';
    if (consumption < 382.6) return 'F';
    return 'G';
}

// Run validation
console.log('CE3X-AI Validation Report');
console.log('='.repeat(60));
console.log(`Testing ${cases.length} real cases from Madrid (D3 zone)\n`);

let correct = 0;
let off1 = 0;
let errors = [];
let totalError = 0;

for (const c of cases) {
    const predicted = calculate(c);
    const predictedLetter = getLetter(predicted);
    const error = Math.abs(predicted - c.consumo_real);
    const errorPct = (error / c.consumo_real * 100);
    totalError += errorPct;
    
    const letterMatch = predictedLetter === c.letra_real;
    const letterOff1 = Math.abs('ABCDEFG'.indexOf(predictedLetter) - 'ABCDEFG'.indexOf(c.letra_real)) <= 1;
    
    if (letterMatch) correct++;
    else if (letterOff1) off1++;
    else {
        errors.push({
            year: c.year,
            tipo: c.tipo,
            calef: c.calefaccion,
            real: `${c.consumo_real} (${c.letra_real})`,
            pred: `${predicted} (${predictedLetter})`,
            diff: `${error.toFixed(0)} kWh (${errorPct.toFixed(0)}%)`
        });
    }
}

console.log('SUMMARY');
console.log('-'.repeat(40));
console.log(`  Letter exact match: ${correct}/${cases.length} (${(correct/cases.length*100).toFixed(1)}%)`);
console.log(`  Letter ±1 match:    ${correct + off1}/${cases.length} (${((correct+off1)/cases.length*100).toFixed(1)}%)`);
console.log(`  Avg error:          ${(totalError/cases.length).toFixed(1)}%`);

if (errors.length > 0) {
    console.log(`\nLARGE ERRORS (>1 letter off): ${errors.length}`);
    console.log('-'.repeat(40));
    for (const e of errors.slice(0, 10)) {
        console.log(`  ${e.year} ${e.tipo} ${e.calef}: real=${e.real}, pred=${e.pred}, diff=${e.diff}`);
    }
}

// Breakdown by decade
console.log('\nBY DECADE');
console.log('-'.repeat(40));
const byDecade = {};
for (const c of cases) {
    const d = Math.floor(c.year / 10) * 10;
    if (!byDecade[d]) byDecade[d] = { cases: [], errors: [] };
    const predicted = calculate(c);
    const error = ((predicted - c.consumo_real) / c.consumo_real * 100);
    byDecade[d].cases.push(c);
    byDecade[d].errors.push(error);
}

for (const d of Object.keys(byDecade).sort()) {
    const data = byDecade[d];
    const avgError = data.errors.reduce((a,b) => a+b, 0) / data.errors.length;
    const avgReal = data.cases.reduce((a,c) => a + c.consumo_real, 0) / data.cases.length;
    const avgPred = data.cases.reduce((a,c) => a + calculate(c), 0) / data.cases.length;
    console.log(`  ${d}s: n=${data.cases.length}, real=${avgReal.toFixed(0)}, pred=${avgPred.toFixed(0)}, error=${avgError.toFixed(1)}%`);
}

// Breakdown by heating
console.log('\nBY HEATING TYPE');
console.log('-'.repeat(40));
const byHeating = {};
for (const c of cases) {
    const h = c.calefaccion || 'Unknown';
    if (!byHeating[h]) byHeating[h] = { cases: [], errors: [] };
    const predicted = calculate(c);
    const error = ((predicted - c.consumo_real) / c.consumo_real * 100);
    byHeating[h].cases.push(c);
    byHeating[h].errors.push(error);
}

for (const h of Object.keys(byHeating).sort((a,b) => byHeating[b].cases.length - byHeating[a].cases.length)) {
    const data = byHeating[h];
    if (data.cases.length >= 3) {
        const avgError = data.errors.reduce((a,b) => a+b, 0) / data.errors.length;
        console.log(`  ${h}: n=${data.cases.length}, error=${avgError.toFixed(1)}%`);
    }
}

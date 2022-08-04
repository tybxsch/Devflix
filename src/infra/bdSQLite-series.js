import sqlite3 from 'sqlite3';
const bdS = new sqlite3.Database('./src/infra/series.db');


//Processamento de sinal
process.on('SIGINT', () =>
    bdS.close(() => {
        console.log('BD encerrado!');
        process.exit(0);
    })
);

export {bdS};
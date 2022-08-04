import sqlite3 from "sqlite3";
const bd = new sqlite3.Database("./series.db");

const SERIES_SCHEMA = `
CREATE TABLE IF NOT EXISTS "SERIES" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "title" VARCHAR(200),
    "description" varchar (500),
    "genre" varchar(64),
    "seasons" DECIMAL(100),
    "urlimg" varchar(500)
);`;
    
const ADD_SERIES_DATA = `INSERT INTO SERIES (id, title, description, genre, seasons, urlimg) VALUES 
(1, 'Mr Robot', 'This show is about a programmer who works as a cyber security engineer in a company during day and a vigilante hacker at night.', 'Drama thriller', '4', 'https://i.pinimg.com/originals/4e/8a/47/4e8a47abf15a276c97cead4b2bedad4f.jpg'),
(2, 'Silicon Valley', 'The story revolves around a silicon valley engineer who struggles to build his company named Pied Piper.', 'Comedy', '6', 'https://i.pinimg.com/originals/27/15/1a/27151a062a12b3c29b7b451826a372e7.png'),
(3, 'Person of Interest', 'This tv series is about a rich programmer who saves life with the help of surveillance AI that sends them information about the people involved in impending crimes.', 'Crime Drama', '5', 'https://i.pinimg.com/originals/a5/d0/69/a5d069a3bb060e2b148e1b2a3ff25258.jpg')`;


function criaTabelaSeries() {
    bd.run(SERIES_SCHEMA, (error) => {
      if (error) console.log('Erro ao criar tabela', error);
    });
  }
  
  
  function populaTabelaSeries() {
    bd.run(ADD_SERIES_DATA, (error) => {
      if (error) console.log("Erro ao popular tabela de Series", error);
    });
  }
  

  bd.serialize(() => {
    criaTabelaSeries();
    populaTabelaSeries();
  });
export class SerieDAO {
    constructor(bdS) {
        this.bdS = bdS;
    }

    listarSeries(){
        return new Promise ((resolve,reject)=>{
            this.bdS.all('SELECT * FROM SERIES', (error, result)=>{
                if(error) reject(error);
                else resolve(result)
            })
        })
    }

    listarSeriesID(id){
        return new Promise ((resolve,reject)=>{
            this.bdS.all(`SELECT * FROM SERIES WHERE id = ${id} `, (error, result)=>{
                if(error) {
                reject(error)
                console.log(error)
                }else resolve(result)
            })
        })
    }
    
    cadastrarSeries(Serie){
        return new Promise ((resolve,reject)=>{
            console.log(Serie)
            this.bdS.all(`INSERT INTO SERIES (title, description, genre, seasons, urlimg)
            VALUES (?, ?, ?, ?, ?)`, [Serie.title, Serie.description, Serie.genre, Serie.seasons, Serie.urlimg],(error)=>{
                if(error) {
                    reject(error)
                    console.log(error)
                 }else resolve('CREATED')
            })
        })
    }

    alterarSeries(serieUpdate){
        console.log(serieUpdate)
        return new Promise ((resolve,reject)=>{
            this.bdS.all(`UPDATE SERIES SET title = ?, description = ?, genre = ?, seasons = ?, urlimg = ? WHERE id = ?` , 
            serieUpdate,(error)=>{
                if(error) reject(error)
                else resolve("UPDATED")
            })
        })
     }

     deletarSeries(id){
        return new Promise ((resolve,reject)=>{
            this.bdS.all(`DELETE FROM SERIES WHERE id = ${id} `, (error)=>{
                if(error) reject(error)
                else resolve("DELETED")
            })
        })
     }
}


        
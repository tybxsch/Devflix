import {bdS} from "../infra/bdSQLite-series.js";
import {SerieDAO }from '../DAO/series-DAO.js';
import {Serie } from '../models/series-model.js';

export const series = (app, bdS)=>{
    const SeriesDAO = new SerieDAO(bdS);

    //rota para puxar series
    app.get("/series", (req, res) => {
        SeriesDAO.listarSeries()
        .then((result) => {
          res.status(200).json({ "Series catalogadas": result })
        })
        .catch((err) => {res.send(err)})
      });

    //rota para puxar series por parametro
    app.get('/series/:id', (req, res) => {
        SeriesDAO.listarSeriesID(req.params.id)
          .then((result) => {
            console.log(result)
            res.status(200).json({ "Serie por ID": result })
          })
          .catch((err) => {
            res.send(err);
          });
      });

    //rota para cadastrar series
    app.post("/series/novaSerie", (req, res) => {
        const body = req.body;
        const novaSerie = new Serie(body.title, body.description, body.genre, body.seasons, body.urlimg)
        console.log(novaSerie);
        SeriesDAO.cadastrarSeries(novaSerie)
         .then((result)=>{
          res.send(`Serie adicionada com sucesso` );
         })
         .catch((err)=>{
          res.send(err);
         })
        
    });


    //rota para alterar serie
    app.put ('/series/:id', (req,res)=>{
        const body = req.body;
        const id = req.params.id;
        console.log(id)
        SeriesDAO.listarSeriesID(req.params.id)
        .then((result) => {
            const series = result[0];
            const serieUpdate = new Serie(
                body.title || series.title, 
                body.description || series.description, 
                body.genre || series.genre, 
                body.seasons || series.seasons,
                body.urlimg || series.urlimg
                )
       
                const param = [
                serieUpdate.title,
                serieUpdate.description,
                serieUpdate.genre,
                serieUpdate.seasons,
                serieUpdate.urlimg,
                series.id
                ];
                
                SeriesDAO.alterarSeries(param)
                  .then((resultUpdated) => {
                    console.log(resultUpdated);
                    res.send('UPDATED?');
                  })
                  .catch((err) => {
                    res.send(err);
                  });
        })
        .catch((err) => {
          res.send(err);
        });
    })

    //rota para deletar series 
    app.delete ('/series/:id', (req,res)=>{
        SeriesDAO.deletarSeries(req.params.id)
        .then((result) => {
            res.send(`Serie deletada` );
          })
          .catch((err) => {
          res.send(err);
      });
    })
}
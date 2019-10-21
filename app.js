const express = require('express')

const app = express()
const metReq = require('./met.js')


const port = process.env.PORT || 3000 // asi funciona en heroku si no en el puerto 3000

app.get('/',function(req,res){
	res.send({
 			greeting: 'Hola mundo'
 	})
})

app.get('/students/:id', function(req,res) {
	if(req.params.id == 'A00818665')
	{
		res.send({
			id: req.params.id,
  			fullname: 'Ana Jimena Lomeli Cantu',
  			nickname: 'Strider',
  			age: '22'
		})
	} else {
		res.send({
			error:'Debes agregar el numero de matricula A00818665'
		})
	}
})

app.get('/met', function(req,res){
	
	if(!req.query.search) {
		res.send({
			error:'Debes enviar el objeto u autor'
		})
		return;
	}

	metReq.metRequest(req.query.search, function(error, response){
		if( error ) {
			return res.send({
				error: error
			})
		}
		if(response.artist){
			res.send({
				searchTerm: response.searchTerm,
				artist :response.artist,
				title: response.title,
				year: response.year,
				technique: response.technique,
				metUrl: response.metUrl
			})
		} else {
			res.send(response)
		}
	})

})

app.get('*', function(req, res){ 
		 	res.send({
		 		error: 'Ruta no valida'
 	})
})

app.listen(port, function() {
	console.log('Up and running!')
})
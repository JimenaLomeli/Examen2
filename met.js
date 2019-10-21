const request = require('request')


const metRequest = function(objectName, callback) {
	const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q='
				+ objectName
	request({ url, json: true }, function(error, response){
		if( error ) {
			callback('Unable to connect to MET service', undefined)
		} else if (response.body.total == 0){
			return response.send({
				error: error
			})
		} else if(response.body.message == 'Not found') {
		 	callback('Error: No se encontro el sitio', undefined)
		} else {
			const dresp = response.body

			const info = {
				objectID : dresp.objectIDs[0],
				objectName : objectName
			}
			artRequest(info.objectID, info.objectName, callback)
		}
		
	})
}

const artRequest = function(objectid,objectName, callback) {
	const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' 
				+ objectid

	request({url, json:true},function(error,response){
		if( error ) {
			callback('Unable to connect to MET service', undefined)
		} else {
			const dresp = response.body

			if(dresp.Response == 'False') {
				callback(dresp.Error, undefined)
			} else {
				const info = {
					searchTerm: objectName,
					artist : dresp.constituents[0].name,
					title: dresp.title,
					year: dresp.objectEndDate,
					technique: dresp.medium,
					metUrl: dresp.objectURL
				}	
				callback(undefined,info)
			}
		}
	})

}

module.exports = {
	metRequest : metRequest,
	artRequest : artRequest
}

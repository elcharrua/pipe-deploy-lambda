const axios  = require("axios");

exports.handler = async event =>{
    console.info("Iniciando validar processo do workflow de solicitacoes vencidas.")

    const data = {
        'grant_type': process.env.grant_type,
        'client_id': process.env.client_id,
        'client_secret': process.env.client_secret,
        'scope': process.env.scope
      }
      
     var token = '' 
         
      await axios.post(``,data).then((result) => {
           token = result.data.access_token
            
           });
           
console.info("token: ", token)
           
       await  axios.get(``,  {
            headers: {
                'Authorization': 'Bearer '+token,
                'Content-Type': 'application/json'
          
            }
              }).then((result) => {
                console.info("RESPONSE BODY: ", result.data)
               });

return{
    statusCode: 200,
    boody: 'Processo finalizado com sucesso.'
}
}
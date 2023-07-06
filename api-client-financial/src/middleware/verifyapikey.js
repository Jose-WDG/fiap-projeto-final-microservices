function verifyApyKey(req, res, next){
    const apiKeyRequest = req.body.apikey || req.query.apikey || req.headers['apikey']
    const apiKeyToken = req.content.apiKey
    console.log(`apiKeyRequest: ${apiKeyRequest}`)
    console.log(`apikeyToken: ${req.content.apiKey}`)
     // Verificar a API Key
     const apikeyvalid = apiKeyRequest === apiKeyToken;
     console.log(apikeyvalid)
     if (!apikeyvalid) {
         return res.status(403).json({ error: 'ApiKey é inválida' });
     }else{
        return next();
     }
}

module.exports = verifyApyKey
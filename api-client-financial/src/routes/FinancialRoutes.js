const express = require('express');
const router = express.Router();

const verificarToken = require('../middleware/VerifyToken');
const financialController = require('../controller/FinancialController');
const verifyApyKey = require('../middleware/verifyapikey');

// Rota para atualizar informações financeiras
router.put('/finance', verificarToken, verifyApyKey, financialController.updateFinancialInfo.bind(financialController));

// Rota para cadastrar informações financeiras
router.post('/finance', verificarToken, verifyApyKey, financialController.registerFinancialInfo.bind(financialController));

// Rota para obter informações financeiras
router.get('/finance', verificarToken, verifyApyKey, financialController.getFinancialInfo.bind(financialController));

// Rota para obter todas as informações financeiras
router.get("/finance/list", financialController.findAll.bind(financialController));

// Apagar informações financeiras
router.delete('/finance/delete/:id', financialController.deleteFinancial.bind(financialController));

// Rota para lidar com endpoints não encontrados
router.use((_, res) => {
    res.type("application/json");
    res.status(404).json({ error: 'Endpoint não encontrado' });
});

module.exports = router;
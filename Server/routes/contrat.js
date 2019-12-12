var path = require('path');
var fs = require('fs');
var url = require('url');
var express = require('express');
var querystring =require('querystring');

const { ContractsDir, ContractsOutputDir } = require('../constant');
const {  getAbi } = require('../interfaces/base');
const utils = require('../nodejs-sdk/packages/api/common/utils');
const   Web3jService = require('../nodejs-sdk/packages/api/web3j').Web3jService;

var nodeApi = new Web3jService();
var router = express.Router();


/* 部署合约 */
router.get("/deploy", function(req, res, next){
    let contractName = "test1";
    if (!contractName.endsWith('.sol')) {
        contractName += '.sol';
    }

    let contractPath = path.join(ContractsDir, contractName);
    if (!fs.existsSync(contractPath)) {
        throw new Error(`${contractName} doesn't exist`);
    }
    let outputDir = ContractsOutputDir;

    nodeApi.deploy(contractPath, outputDir).then(result => {
        let contractAddress = result.contractAddress;
        if (result.status === '0x0') {
            let addressPath = path.join(outputDir, `.${path.basename(contractName, '.sol')}.address`);

            try {
                fs.appendFileSync(addressPath, contractAddress + '\n');
            } catch (error) { }
        }
        res.status(200)
        res.json({
            message: "success",
            data: {
                contractAddress: result.contractAddress,
                status: result.status,
                deployer: result.from
             }
        })
    });
});

/*********************调用合约api**********************/
router.get("/call/get", function(req, res, next){
        let contractName = "HelloWorld";
        let contractAddress ="0x861b700f6a86baa8d31d61518149add8e62d770a";
        let functionName = "get";
        let parameters =  [];

        let abi = getAbi(contractName);

        if (!abi) {
            throw new Error(`no abi file for contract ${contractName}`);
        }

        for (let item of abi) {
            if (item.name === functionName && item.type === 'function') {
                if (item.inputs.length !== parameters.length) {
                    throw new Error(`wrong number of parameters for function \`${item.name}\`, expected ${item.inputs.length} but got ${parameters.length}`);
                }

                functionName = utils.spliceFunctionSignature(item);

                if (item.constant) {
                    return nodeApi.call(contractAddress, functionName, parameters).then(result => {
                        let status = result.result.status;
                        let ret = {
                            status: status
                        };
                        let output = result.result.output;
                        if (output !== '0x') {
                            ret.output = utils.decodeMethod(item, output);
                        }
                        res.status(200)
                        res.json({
                            message: "success",
                            data: ret
                        })
                    });
                } else {
                    return nodeApi.sendRawTransaction(contractAddress, functionName, parameters).then(result => {
                        let txHash = result.transactionHash;
                        let status = result.status;
                        let ret = {
                            transactionHash: txHash,
                            status: status
                        };
                        let output = result.output;
                        if (output !== '0x') {
                            ret.output = utils.decodeMethod(item, output);
                        }
                        res.status(200)
                        res.json({
                            message: "success",
                            data: ret
                        })
                    });
                }
            }
        }
        throw new Error(`no function named as \`${functionName}\` in contract \`${contractName}\``);
});


/*********************调用合约api**********************/
router.post("/call/set", function(req, res, next){
    let params = JSON.stringify(req.body);
    console.log(req.body);
    let contractName = "HelloWorld";
    let contractAddress ="0x861b700f6a86baa8d31d61518149add8e62d770a";
    let functionName = "set";
    let parameters =  [];
    for(let key in req.body){
        parameters.push(req.body[key]);
    }
    console.log(parameters);
    try{
        let abi = getAbi(contractName);

        if (!abi) {
            throw new Error(`no abi file for contract ${contractName}`);
        }
    
        for (let item of abi) {
            if (item.name === functionName && item.type === 'function') {
                if (item.inputs.length !== parameters.length) {
                    throw new Error(`wrong number of parameters for function \`${item.name}\`, expected ${item.inputs.length} but got ${parameters.length}`);
                }
    
                functionName = utils.spliceFunctionSignature(item);
    
                if (item.constant) {
                    return nodeApi.call(contractAddress, functionName, parameters).then(result => {
                        let status = result.result.status;
                        let ret = {
                            status: status
                        };
                        let output = result.result.output;
                        if (output !== '0x') {
                            ret.output = utils.decodeMethod(item, output);
                        }
                        res.status(200)
                        res.json({
                            message: "success",
                            data: ret
                        })
                    });
                } else {
                    return nodeApi.sendRawTransaction(contractAddress, functionName, parameters).then(result => {
                        let txHash = result.transactionHash;
                        let status = result.status;
                        let ret = {
                            transactionHash: txHash,
                            status: status
                        };
                        let output = result.output;
                        if (output !== '0x') {
                            ret.output = utils.decodeMethod(item, output);
                        }
                        res.status(200)
                        res.json({
                            message: "success",
                            data: ret
                        })
                    });
                }
            }
        }
        throw new Error(`no function named as \`${functionName}\` in contract \`${contractName}\``);
    }catch(error){
        console.log(error)
        res.status(404)
        res.json({
            message: "error",
            // data: error
        })
    }
});

router.post("/call/createNewTransaction", function(req, res, next){
});


router.post("/call/transferReceipt", function(req, res, next){
});

// 
router.post("/call/financeApply", function(req, res, next){
});

router.get("/call/createNewTransaction", function(req, res, next){
});

router.get("/call/createNewTransaction", function(req, res, next){
});
module.exports = router;
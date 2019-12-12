var Web3EthAccounts = require('web3-eth-accounts');
var express = require('express');
var router = express.Router();

var account = new Web3EthAccounts('ws://localhost:20200');
const { CRUDService, Table, Condition, Entry } = require('../nodejs-sdk/packages/api');
let crudService = new CRUDService();

var userTableName = "test3"


// 注册
router.post("/signUp", function(req, res, next){
    
    var newAccount = account.create();
    console.log(newAccount)

    let entries = req.body.password.toString() + "," + newAccount.address;
    entries = entries.trim();
    console.log(entries);

    // let commandInfo = interfaces.find(value => value.name == "insert");
    // commandInfo.handler({
    //     tableName: userTableName,
    //     key:  req.body.username,
    //     entry: entry
    // });

    crudService.desc(userTableName).then(tableInfo => {
        let table = new Table(tableInfo.tableName, req.body.username, tableInfo.valueFields, tableInfo.optional);

        let fieldNames = tableInfo.valueFields.split(',');
        let fieldValues = entries.split(',');

        if (fieldNames.length !== fieldValues.length) {
            throw new Error(`unmatch number of fields, expected ${fieldNames.length} but got ${fieldValues.length}`);
        }

        let entry = new Entry();
        for (let index in fieldNames) {
            entry.put(fieldNames[index], fieldValues[index]);
        }

        crudService.insert(table, entry).then(result=>{
            console.log(result);
            res.status(200)
            res.json({
                    message: "success",
                    data: {
                        address: newAccount.address,
                        // privateKey: newAccount.privateKey
                    }
            })
        }).catch(reason => {
            process.exitCode = -1;

            if (reason instanceof Error) {
                console.error(chalk.red(reason.stack));
            } else {
                if (reason instanceof Object) {
                    if (isJSON(reason, true)) {
                        reason = JSON.stringify(reason);
                    }
                }
                console.error(chalk.red(reason));
            }
        });
    });
});

router.post("/signIn", function(req, res, next){

    let condition = "password=" + req.body.password; 
    condition = parseCondition(condition);

    crudService.desc(userTableName).then(tableInfo => {
        let table = new Table(tableInfo.tableName, req.body.username, tableInfo.valueFields, tableInfo.optional);

        crudService.select(table, condition).then(result=>{
            console.log(result);
            if(result.length == 0){
                res.status(404)
                res.json({
                        message: "failed",
                        data: result
                })
            }else{
                res.status(200)
                res.json({
                        message: "success",
                        data: result
                })
            }
        }).catch(reason => {
            process.exitCode = -1;

            if (reason instanceof Error) {
                console.error(reason.stack);
            } else {
                if (reason instanceof Object) {
                    if (isJSON(reason, true)) {
                        reason = JSON.stringify(reason);
                    }
                }
                console.error(reason);
            }
        });
    });
});


function parseCondition(condition) {
    let ops = ['!=', '>=', '<=', '>', '<', '='];

    for (let op of ops) {
        let pos = condition.indexOf(op);
        if (pos >= 0) {
            let key = condition.substring(0, pos);
            let value = condition.substring(pos + 1);
            let ret = new Condition();

            switch (op) {
                case '!=':
                    ret.ne(key, value);
                    return ret;
                case '>=':
                    ret.ge(key, value);
                    return ret;
                case '<=':
                    ret.le(key, value);
                    return ret;
                case '>':
                    ret.gt(key, value);
                    return ret;
                case '<':
                    ret.lt(key, value);
                    return ret;
                case '=':
                    ret.eq(key, value);
                    return ret;
                default:
                    throw new Error('impossible to here');
            }
        }
    }

    throw new Error('illegal condition expression');
}

module.exports = router;
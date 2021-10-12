const AWS = require("aws-sdk");
let awsConfig = {
    "region": "eu-west-2"
};
AWS.config.update(awsConfig);

const dynamodb = new AWS.DynamoDB.DocumentClient();

const dynamodbTableName = 'wiredPlus';
const healthPath = '/health';
const itemsPath = '/contact';

exports.handler = async function(event) {
    let response;
    switch(true){
        case event.httpMethod === 'GET' && event.path === healthPath :
            response = buildResponse(200); 
            break;
        case event.httpMethod === 'POST' && event.path === itemsPath:
            const eventBody = JSON.parse(event.body);
            const isEmailValid = validateEmail(eventBody.email);

            if (!isEmailValid) {
                response = buildResponse(400, {"errorMessage": "Invalid email address"});
            } else {
                response = await addContact(eventBody);
            }
            break;
        default:
            response = buildResponse(404, {"errorMessage": "404 not found"});
    }
    return response;
}

function buildResponse(statusCode, body = 'healthy') {
    return {
        statusCode,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)

    }
}

async function addContact(requestBody) {
    const reqBodyClone = JSON.parse(JSON.stringify(requestBody));
    reqBodyClone.id = Math.floor(Math.random() * 999999);
    
    reqBodyClone.status = validatedStatus(reqBodyClone.status);
    const params = {
      TableName: dynamodbTableName,
      Item: reqBodyClone
    }
    return await dynamodb.put(params).promise().then(() => {

      return buildResponse(201, reqBodyClone);
    }, (error) => {
        buildResponse(500, {"errorMessage": "Opps something went wrong", "error": error});
    })
}

function validateEmail(email) {
    if (!email || !email.length) {
        return false;
    }

    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
}

function validatedStatus(status) {
    const statusTypes = ['active', 'unsubscribe', 'pending'];

    let validatedStatus = status;
    if (!status || !status.length || !statusTypes.includes(status)) {
        validatedStatus = "pending";
    }

    return validatedStatus;
}
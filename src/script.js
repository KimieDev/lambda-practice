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
    console.log('Request event: ', event);
    let response;
    switch(true){
        case event.httpMethod === 'GET' && event.path === healthPath :
            response = buildResponse(200); 
            break;
        case event.httpMethod === 'POST' && event.path === itemsPath:
            response = await addContact(JSON.parse(event.body));
            break;
        default:
            response = buildResponse(404, '404 Not Found');
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
    reqBodyClone.status = 'pending';
    const params = {
      TableName: dynamodbTableName,
      Item: reqBodyClone
    }
    return await dynamodb.put(params).promise().then(() => {

      return buildResponse(201, reqBodyClone);
    }, (error) => {
      console.error('make error handling', error);
    })
}


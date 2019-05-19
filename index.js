require('dotenv').config();
const AWS = require('aws-sdk'); // Put Access Key & Secret Key -> '~/.aws/credentials' to work
var Promise = require('bluebird'); // Promise lib
const argv = require('yargs').argv;
const fs = require('fs');
const path = require('path');

if (!argv.file || !fs.existsSync(argv.file)) throw new Error('Por favor informe o parâmetro "File" corretamente.')

if(!process.env.S3_BUCKET_NAME) throw new Error('Por favor insira a variavel de ambiente "S3_BUCKET_NAME"')
if(!process.env.AWS_REGION) throw new Error('Por favor insira a variavel de ambiente "AWS_REGION"')

AWS.config.setPromisesDependency(Promise); // Promisify
AWS.config.update({region: process.env.AWS_REGION}); // SET REGION FOR REKOGNITION

const rek = new AWS.Rekognition(),
    s3 = new AWS.S3();


function readFile(filepath) {
    var data = fs.readFileSync(filepath);
    var name = path.basename(filepath);
    return { name, data };
}

async function main() {
    const file = readFile(argv.file);
    const bucketName = process.env.S3_BUCKET_NAME; // S3_BUCKET_NAME in .env
    try {
        await s3.putObject({ Bucket: bucketName, Key: file.name, Body: file.data }).promise();
        var rekLabels = await rek.detectLabels({
            Image: {
                S3Object: {
                    Bucket: bucketName,
                    Name: file.name
                }
            },
            MaxLabels: 10,
            MinConfidence: 50
        }).promise();
        console.table(rekLabels.Labels)
    } catch (error) {
        console.error(error);
    }
}

main();
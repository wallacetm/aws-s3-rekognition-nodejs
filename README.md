# aws-s3-rekognition-nodejs

## Usage
* Change folder `cd aws-s3-rekognition-nodejs/`
* Execute command `npm install`
* Execute command `mkdir ~/.aws && touch ~/.aws/credentials && vim ~/.aws/credentials`
* Put yout AWS Credentials:
```properties
[default]
aws_access_key_id = [AWS ACCESS KEY HERE]
aws_secret_access_key = [AWS SECRET KEY HERE]
```
* Set Envs: 
```properties
S3_BUCKET_NAME=
AWS_REGION=
```
* Execute `node index.js --file "path_to_upload_image"`

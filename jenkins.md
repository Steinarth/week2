## Setting up Jenkins
I manually set up Jenkins on the aws instance, Here are my notes on setting up Jenkins
[Jenkins setup](docs/setting-up-jenkins.md) , along how i solved some problems that came up.

## Jenkins instance
I have created a user called hgop-user which can be used to access the Jenkins server
which is at the url: http://ec2-52-56-166-4.eu-west-2.compute.amazonaws.com:8080/

## Other steps to make jenkins work
Since we are running the Jenkins CI from a low resource computer i needed to change the
npm install (Jenkinsfile) to yarn install in both client and root, since yarn uses the cache to it's advantage.  
I also logged into docker, by going into the Jenkins user and entering the username and password manually.

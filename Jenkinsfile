node {
    checkout scm
    stage('Build') {
        echo 'Running tests.....3 '
        sh 'curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash'
        sh '. ~/.nvm/nvm.sh'
        sh 'nvm install 6.11.5'
        sh 'node -e "console.log('Running Node.js ' + process.version)"'
        echo 'node-ff'
        sh 'npm install'
        sh 'npm run test'
    }
    stage('Test') {
        echo 'Testing..'
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}

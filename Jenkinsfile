node {
    checkout scm
    stage('Build') {
        echo 'Running tests 2'
        sh 'npm install'
        sh 'npm run jenkinserverstest'
    }
    stage('Test') {
        echo 'Testing..'
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}

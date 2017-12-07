node {
    checkout scm
    stage('Build') {
        echo 'Running tests'
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

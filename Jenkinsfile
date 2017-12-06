node {
    checkout scm
    stage('Build') {
        echo 'Running tests.....3 '
        sh 'pwd'
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

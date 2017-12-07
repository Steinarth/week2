node {
    checkout scm
    stage('Build') {
        echo 'Running tests 2'
        sh 'npm install'
        sh 'npm run jenkinserverstest'
        dir ('client') {
          sh 'pwd'
          sh 'npm install'
          sh 'npm run jenkinsclienttest'
        }
    }
    stage('Test') {
        echo 'Testing..'
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}

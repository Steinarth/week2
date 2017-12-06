node {
    */ checkout code from source control, scm instructs to clone the revision that triggered this pipeline to run*/
    checkout scm
    stage('Build') {
        echo 'Running tests.....'
        sh 'npm run test'
    }
    stage('Test') {
        echo 'Testing..'
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}

node {
    checkout scm
    stage('Test'){
      sh 'npm install'
      echo '***Running server tests***'
      sh 'npm run jenkinserverstest'
      dir ('client') {
        sh 'npm install'
        echo '***Running client tests***'
        sh 'npm run jenkinsclienttest'
      }

      
    }
    stage('Build') {
      echo '***Pushing to docker-hub***'
      
    }
    stage('Test') {
        echo 'Testing..'
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}

node {
    checkout scm
    stage('Test'){
      sh 'yarn install'
      echo '***Running server tests***'
      sh 'npm run jenkinserverstest'
      dir ('client') {
        sh 'yarn install'
        echo '***Running client tests***'
        sh 'npm run jenkinsclienttest'
      }


    }
    stage('Build') {
      echo '***Pushing to docker-hub***'
      sh './dockerbuild.sh'
    }
    stage('Test') {
        echo 'Testing..'
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}

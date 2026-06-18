pipeline {
    agent any

    stages {

        stage('Debug Workspace') {
            steps {
                sh 'ls -la && cat package.json'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                docker run --rm \
                -v $(pwd):/app \
                -w /app \
                node:20-alpine npm install
                '''
            }
        }

        stage('Build Image') {
            steps {
                sh 'docker build -t social-app:${BUILD_NUMBER} .'
            }
        }
    }
}
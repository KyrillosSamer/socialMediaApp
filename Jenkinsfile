pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
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

        stage('Build TypeScript') {
            steps {
                sh '''
                docker run --rm \
                -v $(pwd):/app \
                -w /app \
                node:20-alpine npm run build
                '''
            }
        }

        stage('Verify dist') {
            steps {
                sh 'ls -la dist || echo "No dist folder found"'
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                docker build -t social-app:${BUILD_NUMBER} .
                '''
            }
        }
    }
}
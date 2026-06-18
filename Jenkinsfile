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
                // التأكد من أننا نستخدم node في المسار الصحيح
                sh 'node -v'
                sh 'npm install'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t social-app:latest .'
            }
        }
    }
}
pipeline {
    agent any 
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            agent {
                docker { image 'node:20-alpine' }
            }
            steps {
                sh 'npm install'
            }
        }
        stage('Build Docker Image') {
            steps {
                // ملاحظة: هذا الأمر سيتم تنفيذه على الحاوية الرئيسية لأن الـ Docker 
                // مربوط بـ /var/run/docker.sock
                sh 'docker build -t social-app:latest .'
            }
        }
    }
}
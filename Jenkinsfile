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
                // تشغيل حاوية مؤقتة لتنفيذ npm install 
                // هذا الأمر لا يحتاج Node.js مثبتاً داخل Jenkins
                sh 'docker run --rm -v $PWD:/app -w /app node:20-alpine npm install'
            }
        }
        stage('Build Docker Image') {
            steps {
                // بناء صورة الـ Docker الخاصة بك
                sh 'docker build -t social-app:latest .'
            }
        }
    }
}
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
                // هذا الأمر سيقوم بتشغيل حاوية Node مؤقتة، 
                // ويقوم بتثبيت المكتبات في مجلد المشروع الحالي
                sh 'docker run --rm -v $(pwd):/app -w /app node:20-alpine npm install'
            }
        }
        stage('Build Docker Image') {
            steps {
                // هذا الأمر سيعمل الآن بفضل ربط الـ docker.sock
                sh 'docker build -t social-app:latest .'
            }
        }
    }
}
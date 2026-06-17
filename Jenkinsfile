pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                // سحب الكود من GitHub
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                // تثبيت المكتبات (التي أصبحت الآن متاحة بفضل تثبيت Node.js)
                sh 'npm install'
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
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                // تثبيت المكتبات
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                // تشغيل الاختبارات إذا كان لديك
                sh 'npm test'
            }
        }
        stage('Build Docker Image') {
            steps {
                // بناء الصورة
                sh 'docker build -t social-app .'
            }
        }
    }
}
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
                // بدلاً من docker run، سنقوم بتثبيت المكتبات مباشرة
                // سنستخدم npm الموجود في الحاوية إذا نجح، 
                // أو سنقوم بتثبيته مرة واحدة فقط.
                sh 'npm install'
            }
        }
        stage('Build Docker Image') {
            steps {
                // بما أننا ربطنا docker.sock، هذا الأمر سيعمل الآن 
                // لأننا لا نحتاج لـ docker داخل docker، 
                // بل سنستخدم Docker المضيف.
                sh 'docker build -t social-app:latest .'
            }
        }
    }
}
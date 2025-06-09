pipeline {
    agent any
    environment {
        REGISTRY = "localhost:32000"
        IMAGE_NAME = "arrienta-frontend"
    }
    stages {
        // Etapa 1: Construir la imagen Docker
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t ${IMAGE_NAME}:latest .'
                    sh 'docker tag ${IMAGE_NAME}:latest ${REGISTRY}/${IMAGE_NAME}:latest'
                }
            }
        }

        // Etapa 2: Subir imagen al registro
        stage('Push Image') {
            steps {
                script {
                    sh 'docker push ${REGISTRY}/${IMAGE_NAME}:latest'
                }
            }
        }

        // Etapa 3: Desplegar en Kubernetes
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh 'microk8s kubectl apply -f k8s/deployment.yaml'
                    sh 'microk8s kubectl apply -f k8s/service.yaml'
                    sh 'microk8s kubectl apply -f k8s/ingress.yaml'
                }
            }
        }
    }
}
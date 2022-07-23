#!groovy
pipeline {
    agent any

    environment {
        DOCKER_HUB = 'nguyenchicuong2402'
        IMAGE_NAME = '{{PROJECT_NAME}}'
    }

    stages {
        stage('Install Dependencies') {
            agent {
                docker {
                    image 'node:16'
                }
            }
            steps {
                sh 'npm install'
            }
        }

        stage('Build Application') {
            agent {
                docker {
                    image 'node:16'
                }
            }
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Image') {
            agent {
                docker {
                    image 'docker:dind'
                    args '--privileged -v /var/run/docker.sock:/var/run/docker.sock'
                }
            }
            steps {
                sh 'docker build . -f Dockerfile.production -t ${DOCKER_HUB}/${IMAGE_NAME}:${BUILD_NUMBER}'
            }
        }

        stage('Push Image') {
            when{
                branch 'master'
            }
            agent {
                docker {
                    image 'docker:dind'
                    args '--privileged -v /var/run/docker.sock:/var/run/docker.sock'
                }
            }
            steps {
                script {
                    if (env.BRANCH_NAME == 'master') {
                        env.BRANCH_NAME = 'latest'
                        echo 'hello world !!'
                    }

                    sh 'docker image tag ${DOCKER_HUB}/${IMAGE_NAME}:${BUILD_NUMBER} ${DOCKER_HUB}/${IMAGE_NAME}:${BRANCH_NAME}'
                    sh 'docker push ${DOCKER_HUB}/${IMAGE_NAME}:${BRANCH_NAME}'
                }
            }
        }

        stage('Cleanup') {
            agent {
                docker {
                    image 'docker:dind'
                    args '--privileged -v /var/run/docker.sock:/var/run/docker.sock'
                }
            }
            steps {
                sh 'docker rmi $(docker images -q -f dangling=true)'
                sh 'docker rm $(docker ps -aqf status=exited)'
            }
        }
    }
}

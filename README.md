# Personal Blog Project

## Overview

This is a personal blog project implemented using Spring Boot with a microservices architecture. The project incorporates Docker for containerization, Jenkins for CI/CD, and SonarQube for code quality analysis. The blog is designed to manage posts and comments through a set of microservices, ensuring modularity and scalability.

## Technologies Used

- Spring Boot
- Docker
- Jenkins
- SonarQube

## Microservices

1. **Authentication Service:** Manages user authentication using Spring Security.

2. **Posts Service:** Handles the creation, modification, and retrieval of blog posts.

3. **Comments Service:** Manages comments related to blog posts.

## CI/CD with Jenkins


   pipeline {
      agent any

    tools {
        maven 'maven'
    }

    stages {
        stage('Git Clone') {
            steps {
                script {
                    checkout([$class: 'GitSCM', branches: [[name: 'main']], userRemoteConfigs: [[url: 'https://github.com/RedaBouougri/blogMicroservices.git']]])
                }
            }
        }

        stage('Build Auth') {
            steps {
                script {
                    dir('blogAuth') {
                        bat 'mvn clean install -DskipTests'
                    }
                }
            }
        }

        stage('Build Comment') {
            steps {
                script {
                    dir('BlogComment') {
                        bat 'mvn clean install -DskipTests'
                    }
                }
            }
        }

        stage('SonarQube Analysis Comment') {
            steps {
                script {
                    dir('BlogComment') {
                        // Run SonarQube analysis with default configuration
                        bat 'mvn sonar:sonar'
                    }
                }
            }
        }

        stage('Build Post') {
            steps {
                script {
                    dir('blogPersonnel') {
                        bat 'mvn clean install -DskipTests'
                    }
                }
            }
        }

        stage('Run') {
            steps {
                script {
                    bat "docker-compose up -d"
                }
            }
     }
     }
     }




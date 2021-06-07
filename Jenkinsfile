#!/usr/bin/env groovy

node {
	def node = docker.image('node:16.3.0-alpine3.12')
	stage('Checkout project') {
		checkout scm
	}
	stage('Lint test') {
		node.inside {
			sh 'npm install'
			sh 'npm run lint'
		}
	}
	stage('Build project') {
		echo 'build'
		node.inside {
			sh 'npm run build'
		}
		sh 'docker build -t dev/agl-ui:latest .'
	}
	stage('test image') {
		sef customImage = docker.build("dev/agl-ui:latest:${env.BUILD_ID}")

		customImage.inside {
			sh 'ls'
		}
	}
	stage('deploy') {
		echo 'deploy'
	}
}
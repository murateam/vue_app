#!/usr/bin/env groovy

node {
	def node = docker.image('node:16.3.0-alpine3.12')
	stage('Checkout project') {
		checkout scm
	}
	stage('Install npm') {
		node.inside {
			sh 'npm install'
		}
	}
	stage('Lint test') {
		node.inside {
			sh 'npm run lint'
		}
	}
	stage('Build npm') {
		node.inside {
			sh 'npm run build'
		}
	}
	stage('Build docker') {
		sh 'docker build -t agl-ui:withoutApi .'
	}
	stage('deploy') {
		echo 'deploy'
	}
}
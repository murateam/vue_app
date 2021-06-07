#!/usr/bin/env groovy

node {
	def node = docker.image('node:16.3.0-alpine3.12')
	stage('checkout project') {
		echo 'Checkout project'
	}
	stage('npm run lint:test') {
		// docker.image('node:lts-buster-slim').withRun() { c ->
		// 	sh "npm install"
		// 	sh "npm run lint"
		// }
		node.inside {
			sh 'npm install'
			sh 'npm run lint'
		}
	}
	stage('build project') {
		echo 'build'
		node.inside {
			sh 'npm run build'
		}
		sh 'docker build -t ui:latest .'
	}
	stage('deploy') {
		echo 'deploy'
	}
}
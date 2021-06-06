#!/usr/bin/env groovy

node {
	// def node = docker.image('node:lts-buster-slim').withRun('-p 3000:3000')
	stage('checkout project') {
		echo 'Checkout project'
	}
	stage('run lint (npm run lint:test') {
		docker.image('node:lts-buster-slim').withRun() { c ->
			sh "npm install"
			sh "npm run lint"
		}
	}
	stage('build project') {
		echo 'build'
	}
	stage('deploy') {
		echo 'deploy'
	}
}
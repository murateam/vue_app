#!/usr/bin/env groovy

node {
	def node = docker.image 'node:lts-buster-slim'
	stage('checkout project') {
		echo 'Checkout project'
	}
	stage('run lint (npm run lint:test') {
		node.inside {
			sh "sudo npm install"
		}
	}
	stage('build project') {
		echo 'build'
	}
	stage('deploy') {
		echo 'deploy'
	}
}
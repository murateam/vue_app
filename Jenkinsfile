#!/usr/bin/env groovy

node {
	def node = docker.image 'node:lts-buster-slim'
	stage('checkout project') {
		echo 'Checkout project'
	}
	stage('run lint (npm run lint:test') {
		node.inside {
			sh 'npm --version'
		}
		echo 'run lint'
	}
	stage('build project') {
		echo 'build'
	}
	stage('deploy') {
		echo 'deploy'
	}
}
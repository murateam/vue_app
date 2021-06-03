#!/usr/bin/env groovy

node {
	docker {
		image 'node'
	}
	stage('checkout project') {
		echo 'Checkout project'
	}
	stage('run lint (npm run lint:test') {
		sh 'npm --version'
		echo 'run lint'
	}
	stage('build project') {
		echo 'build'
	}
	stage('deploy') {
		echo 'deploy'
	}
}
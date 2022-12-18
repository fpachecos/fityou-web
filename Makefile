# Define the commandline invocation of Maven if necessary:
ifeq ($(MVN),)
    MVN  := mvn
endif

ifeq ($(GIT),)
    GIT  := git
endif

docker-build:
	- docker container stop fityou-workspace
	- docker container prune -f
	- docker image rm -f web:latest
	docker build -t web .
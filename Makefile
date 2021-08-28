# just type make to compile
build:
	docker run --rm -it -v "${PWD}"/slides:/src dgrnwd/teachingslides:latest

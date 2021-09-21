HTM := $(patsubst %.md,%.html,$(wildcard *.md))
BMR := $(patsubst %.md,%.bmr.pdf,$(wildcard *.md))

all : $(HTM) $(BMR)

%.html : %.md
	pandoc $^ \
	--defaults revealjs \
	--css assets/style.css \
	-V highlightjs-theme=github-dark \
	-V theme=black \
	-o $@

%.bmr.pdf : %.md
	pandoc 	$^ \
	--defaults beamer \
	-o $@

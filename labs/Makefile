PDF := $(patsubst %.md,%.lab.pdf,$(wildcard *.md))

all : $(PDF)

%.lab.pdf : %.md
	pandoc $^ \
	-V geometry:left=3cm,right=3cm,top=2cm,bottom=3cm \
	-t pdf \
	-o $@

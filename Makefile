# Makefile for deploying deck.aaronbieber.com.

OPTS=-rlptdv
EXCLUDE=--exclude '.git*' --exclude '.*' --exclude '\#*\#' --exclude Makefile
DEST=aaronbieber.com:/var/www/deck.aaronbieber.com/htdocs/

deploy:
	rsync $(OPTS) $(EXCLUDE) ./build/ $(DEST)

# Makefile for deploying deck.aaronbieber.com.

OPTS=-rlptdv
EXCLUDE=--exclude '.git*' --exclude '.*' --exclude '\#*\#' --exclude Makefile
DEST=airborne@10.20.10.40:/var/www/deck.aaronbieber.com/htdocs/

deploy:
	rsync $(OPTS) $(EXCLUDE) ./build/ $(DEST)

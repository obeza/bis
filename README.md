# Bis
> Manage your bookmarks for files to download

Bis is a simplistic NodeJS command that will download file from a bookmarks that you can manage.

Example :
- You just want **jquery.min.js** in your folder : **libs**, Bis will bring to you **only** the file you want.

## New feature in >O.O.11 :
```sh
$ bis dl angular -s
```
After download the file, **Bis** will add *&lt;script type="text/javascript" src="./angular.min.js">&lt;/script>* in your **index.html**. ( if you have &lt;!--bis-script--> in your index.html file. )


## Install
Install Bis globally with:

```sh
$ npm i -g bis
```

## Documentation
**commands**
- `bis list` list your favorites files from website.
- `bis add` add a url for a file in your favorite's list.
- `bis rm <name>` remove a url in your favorite.
- `bis dl <name> [directory] [-s]` download your file in the directory. With [-s], Bis will add a javascript tag with a link to your file.
- `bis help` list commands for Bis.

## License

M.I.T
# Scotland PHP Website
Aiming to create a larger community on top of local Scottish PHP user groups, this website contains information about the groups and aims to provide high quality resources such as video recording of the talks.

## Usage
Clone the project.

```
git clone git@github.com:scotlandphp/website.git scotlandphp-website
```

Enter the folder.

```
cd scotlandphp-website
```

Use composer to install dependencies

```
php -r "readfile('https://getcomposer.org/installer');" | php
```

```
php composer.phar install
```

### Generate the development version

```
php vendor/bin/robo build
```

### Generate the live version

```
php vendor/bin/robo build --dist
```

### Use the watcher for development

```
php vendor/bin/robo watch
```

## Contributing
There are no specific rules for contributing as it is a fairly simple website.

Please fill up issues before creating PRs, and try to link your commits to the specific issues.

You can also help us create milestones by creating issues and proposing milestone plans or discussions.

## Deployment
We currently deploy the website on OVH Object Storage (Openstack Swift Object Storage) with a flat file structure (no directories at all). The project must therefore been built before deployment (using `vendor/bin/robo build`) and the files from the `dist/` directory only are deployed.

The website is served over **https** thanks to Cloudflare that allows us to use a flexible SSL (connection between Cloudflare and the object storage is not secured basically).

Cloudflare also act as a cache on its CDN, so the cache has to be cleared after deployment.

## Credits:
 * Template:
 	* [Prologue by HTML5 UP](http://html5up.net/prologue)
 * Demo Images:
	* [Felicia Simion](http://ineedchemicalx.deviantart.com/)
	* [Unsplash](https://unsplash.com/)
 * Icons:
	* [Font Awesome](http://fortawesome.github.io/Font-Awesome/)
 * Other
	* [jQuery](https://jquery.com/)
	* html5shiv.js ([@afarkas](https://twitter.com/afarkas) [@jdalton](https://twitter.com/jdalton) [@jon_neal](https://twitter.com/jon_neal) [@rem](https://twitter.com/rem))
	* [CSS3 Pie](http://css3pie.com/)
	* [background-size polyfill](https://github.com/louisremi)
	* [Respond.js](https://github.com/scottjehl/Respond)
	* [jquery.scrolly](http://n33.co/)
	* [jquery.scrollzer](http://n33.co/)
	* [Skel](https://github.com/n33/skel)
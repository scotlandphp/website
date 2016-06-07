<?php
/**
 * This is project's console commands configuration for Robo task runner.
 *
 * @see http://robo.li/
 */
class RoboFile extends \Robo\Tasks
{
    /**
     * Build the project (dev by default)
     *
     * @param array $opts
     * @option $dist Set whether buildDist should be executed
     */
    public function build($opts = ['dist|d' => false])
    {
        $this->buildDev();
        if (isset($opts['dist']) && $opts['dist']) {
            $this->buildDist();
        }
    }

    public function buildDev()
    {
        // remove existing dev and dist folder
        $this->clear();

        // recreate the dev folder
        $this->_mkdir('dev');

        // copy required files
        $this->_copyDir('pages', 'dev');
        $this->_copyDir('images', 'dev');
        $this->_copyDir('favicon', 'dev');

        // compile scss
        $this->compileScss('assets/sass/ie8.scss', 'dev/ie8.css');
        $this->compileScss('assets/sass/ie9.scss', 'dev/ie9.css');
        $this->compileScss('assets/sass/leaflet.scss', 'dev/leaflet.css');
        $this->compileScss('assets/sass/main.scss', 'dev/main.css');

        // fetch javascript
        $this->taskFlattenDir([
            'assets/js' => 'dev',
        ])->run();
    }

    public function buildDist()
    {
        // remove existing dist folder
        $this->_deleteDir('dist');

        // recreate the dist folder
        $this->_mkdir('dist');

        // copy pages
        $this->_copyDir('dev', 'dist');

        foreach (glob('dist/*.css') as $cssFile) {
            $this->taskMinify($cssFile)
                ->to($cssFile)
                ->run();
        }
    }

    public function clear()
    {
        $this->taskDeleteDir([
            'dev',
            'dist',
        ])->run();
    }

    public function watch()
    {
        // build dev environment
        $this->build();

        $this->taskWatch()
            ->monitor('assets/sass', function() {
                foreach (glob('assets/sass/*.scss') as $file) {
                    $this->compileScss(
                        $file,
                        basename($file, '.scss') . '.css'
                    );
                }
            })
            ->monitor('assets/js', function() {
                $this->taskFlattenDir([
                    'assets/js' => 'dev',
                ])->run();
            })
            ->monitor('pages', function() {
                $this->_copyDir('pages', 'dev');
            })
            ->monitor('favicon', function() {
                $this->_copyDir('favicon', 'dev');
            })
            ->monitor('images', function() {
                $this->_copyDir('images', 'dev');
            })
        ->run();
    }

    /**
     * @param $src
     * @param $dest
     */
    private function compileScss($src, $dest)
    {
        // waiting for https://github.com/leafo/scssphp/issues/409
        /*$this->taskScss([
            $src => $dest
        ])
        ->setImportPaths([dirname($src)])
        ->run();*/
        $this->_exec("sass {$src} {$dest}");
    }
}

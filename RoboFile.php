<?php
/**
 * This is project's console commands configuration for Robo task runner.
 *
 * @see http://robo.li/
 */
class RoboFile extends \Robo\Tasks
{
    public function build()
    {
        $this->clear();
        $this->taskFileSystemStack()
            ->mkdir('dist')
            ->run();
        $this->taskFlattenDir([
            'assets/*' => 'dist',
            'pages/*.html' => 'dist',
            'favicon/*' => 'dist',
        ])->run();
    }

    public function clear()
    {
        $this->taskDeleteDir('dist')->run();
    }

    public function watch()
    {
        $this->taskWatch()
            ->monitor('assets/sass/main.scss', function() {
                $this->compileScss(
                    'assets/sass/main.scss',
                    'assets/css/main.css'
                );
            })
            ->monitor('assets/sass/ie8.scss', function() {
                $this->compileScss(
                    'assets/sass/ie8.scss',
                    'assets/css/ie8.css'
                );
            })
            ->monitor('assets/sass/ie9.scss', function() {
                $this->compileScss(
                    'assets/sass/ie9.scss',
                    'assets/css/ie9.css'
                );
            })
        ->run();
    }

    /**
     * @param $src
     * @param $dest
     */
    public function compileScss($src, $dest)
    {
        $this->taskScss([
            $src => $dest
        ])
        ->setImportPaths([dirname($src)])
        ->run();
    }

    public function minifyCss()
    {
        $this->taskMinify( 'assets/css/main.css' )
            ->run();
    }

    public function minifyJs()
    {

    }

    public function concatenateCss()
    {

    }

    public function concatenateJs()
    {

    }
}

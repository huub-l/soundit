<p align="center">
  <span style="font-size:96px;">📦</span>
</p>
 <h1 align="center">Warehouse</h1>

<p align="center">
  <strong>WordPress starter theme baseado no Sage 10</strong>
</p>

<p align="center">
  <a href="https://roots.io/docs/sage/9.x/installation/">Documentação Sage 9</a></a>
</p>

## Features

- SCSS
- ES6
- [Laravel Mix](https://github.com/JeffreyWay/laravel-mix) para compilar assets e concatenating e minificar ficheiros
- [Browsersync](http://www.browsersync.io/) para browser testing sincronizado
- [Blade](https://laravel.com/docs/5.8/blade) como template engine
- [Sage Directives](https://github.com/Log1x/sage-directives) Blade Directives para WordPress, ACF e utilidades

## Libs incluídas

- [Normalize CSS](https://necolas.github.io/normalize.css/) para reset dos estilos
- [Foundation XY Grid](https://get.foundation/sites/docs/xy-grid.html) para Grid System
- [Locomotive Scroll](https://github.com/locomotivemtl/locomotive-scroll) para Smooth Scroll
- [Barba JS](https://barba.js.org/) para transição de páginas em PJAX
- [GSAP](https://greensock.com/gsap/) para animações em JS
- GSAP Plugins - SplitText

## Requisitos

- [WordPress](https://wordpress.org/) >= 5.4
- [PHP](https://secure.php.net/manual/en/install.php) >= 7.2.0 (with [`php-mbstring`](https://secure.php.net/manual/en/book.mbstring.php) enabled)
- [Composer](https://getcomposer.org/download/)
- [Node.js](http://nodejs.org/) >= 8.0.0
- [Yarn](https://yarnpkg.com/en/docs/install)

## Estrutura do tema

```sh
themes/your-theme-name/   # → Root of your Sage based theme
├── app/                  # → Theme PHP
│   ├── Composers/        # → View composers
│   ├── Providers/        # → Service providers
│   ├── admin.php         # → Theme customizer setup
│   ├── filters.php       # → Theme filters
│   ├── helpers.php       # → Helper functions
│   └── setup.php         # → Theme setup
├── config/               # → Config files
│   ├── app.php           # → Application configuration
│   ├── assets.php        # → Asset configuration
│   ├── filesystems.php   # → Filesystems configuration
│   └── view.php          # → View configuration
├── composer.json         # → Autoloading for `app/` files
├── composer.lock         # → Composer lock file (never edit)
├── dist/                 # → Built theme assets (never edit)
├── functions.php         # → Composer autoloader, Acorn bootloader
├── index.php             # → Never manually edit
├── node_modules/         # → Node.js packages (never edit)
├── package.json          # → Node.js dependencies and scripts
├── resources/            # → Theme assets and templates
│   ├── assets/           # → Front-end assets
│   │   ├── fonts/        # → Theme fonts
│   │   ├── images/       # → Theme images
│   │   ├── scripts/      # → Theme JS
│   │   └── styles/       # → Theme stylesheets
│   └── views/            # → Theme templates
│       ├── components/   # → Component templates
│       ├── layouts/      # → Base templates
│       └── partials/     # → Partial templates
├── screenshot.png        # → Theme screenshot for WP admin
├── storage/              # → Storage location for cache (never edit)
├── style.css             # → Theme meta information
├── vendor/               # → Composer packages (never edit)
└── webpack.mix.js        # → Laravel Mix configuration
```

## Setup

Editar `app/setup.php` para habilitar ou desabilitar features do tema, como menus, tamanhos de thumbnail, etc.

## Desenvolvimento do tema

- Correr `yarn` na pasta do tema para instalar dependências
- atualizar `webpack.mix.js` com o URL de desenvolvimento local (ex: warehouse.test)

### Build commands

- `yarn start` — Compila assets quando são feitas atualizações nos ficheiros e começa uma sessão do Browsersync
- `yarn build` — Compila e optimiza os ficheiros na pasta assets
- `yarn build:production` — Compila os assets para produção

## Documentação

- [Sage 9](https://roots.io/sage/docs/) (a ser atualizado para a v10)

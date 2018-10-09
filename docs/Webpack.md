# Why Webpack

* `url-loader`
  * Assets inlining for performance
  * Public Path is easily changeable (useful for building pages for CDN)
* `css-loader`
  * `postcss` automatically re-writes CSS to be compatible with older browsers.
  * Using CSS Modules we avoid conflicts of class names.
* Hot module replacement is built-in.
* Server-side-rendering is built-in.
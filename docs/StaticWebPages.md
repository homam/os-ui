# Why Static Web Pages?

* Simplicity
  * Our user flows are simple
  * Single Page Apps
* Determinability
  * What you develop is what you get
  * Production context is not different from development. We do not modify pages or flows at runtime.
  * Opt-in flows are state machines and state machines are deterministic
  * Changing one component or one stylesheets or updating some text should not break other pages at runtime.
* Reproducibility
* Testability
  * Once a page is tested and is correct, it remains correct.
  * Errors are caught at development time. We can easily catch visual errors, for example: when the text for a new language does not fit inside the original `<div>` element. 
* Performance
  * Static: Pages and assets can be served from a CDN
  * All assets are bundled and minimized at compile time.
* Scalability
  * Stateless static websites can easily be scaled
* Ease of versioning

## At what cost?

* CMS is dead
  * Every change must be complied into the page and be released (as a new version?).
  * More complicated tools may be necessary (for customization or localization).
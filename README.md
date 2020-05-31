# Angular Wordpress Blog
This Angular project is created for the recrutation purpose. It uses public wordpress [API](https://developer.wordpress.com/docs/api/) to get
posts and comments from  https://en.blog.wordpress.com/.

## Additional libraries
 - ngx-pagination
 - ngx-loader
 - Bootstrap
 - prettier (dev)

## Code organisation
```
src
├── app
│   ├── app.component.css
│   ├── app.component.html
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.module.ts
│   ├── app-routing.module.ts
│   ├── core
│   │   ├── config.ts
│   │   └── core.module.ts
│   ├── models
│   │   ├── author.ts
│   │   ├── comment.ts
│   │   ├── page.ts
│   │   ├── pagination.ts
│   │   ├── post.ts
│   │   └── types.ts
│   ├── posts
│   │   ├── api
│   │   │   └── post.api.ts
│   │   ├── components
│   │   │   ├── comment
│   │   │   │   ├── comment.component.css
│   │   │   │   ├── comment.component.html
│   │   │   │   ├── comment.component.spec.ts
│   │   │   │   └── comment.component.ts
│   │   │   └── post
│   │   │       ├── post.component.css
│   │   │       ├── post.component.html
│   │   │       ├── post.component.spec.ts
│   │   │       └── post.component.ts
│   │   ├── containers
│   │   │   ├── post-detail
│   │   │   │   ├── post-detail.component.css
│   │   │   │   ├── post-detail.component.html
│   │   │   │   ├── post-detail.component.spec.ts
│   │   │   │   └── post-detail.component.ts
│   │   │   └── posts
│   │   │       ├── posts.component.css
│   │   │       ├── posts.component.html
│   │   │       ├── posts.component.spec.ts
│   │   │       └── posts.component.ts
│   │   ├── post-routing.module.ts
│   │   └── posts.module.ts
│   └── shared
│       ├── shared.module.ts
│       └── utils.service.ts

```
I have made 3 modules:
- core
- shared
- posts
#### Core
Core is responsible for importing core modules, such as HttpClient and RoutingModule. It's also contains config 
that has an api link and pagination settings.

#### Shared
Shared is responsible for future components created. Currently, it exports just CommonModule. It also contains utility service with pagination helper functions.

#### Posts
```
posts
├── api
│   └── post.api.ts
├── components
│   ├── comment
│   │   ├── comment.component.css
│   │   ├── comment.component.html
│   │   ├── comment.component.spec.ts
│   │   └── comment.component.ts
│   └── post
│       ├── post.component.css
│       ├── post.component.html
│       ├── post.component.spec.ts
│       └── post.component.ts
├── containers
│   ├── post-detail
│   │   ├── post-detail.component.css
│   │   ├── post-detail.component.html
│   │   ├── post-detail.component.spec.ts
│   │   └── post-detail.component.ts
│   └── posts
│       ├── posts.component.css
│       ├── posts.component.html
│       ├── posts.component.spec.ts
│       └── posts.component.ts
├── post-routing.module.ts
└── posts.module.ts

```

Post module contains 2 smart components and 3 dummy components. Containers are responsible for using post service, fetch data and
deliver it to the template.

#### Models
Models are responsible for modeling api data.

# Changelog

## 0.4.0 (Not yet released)

## 0.3.0 (2017-07-10)
* NEW: compatibility with CRUDL 0.3.0. This includes:
    - Using the [connectors package](https://github.com/crudlio/crudl-connectors-base)
    - Using the `admin.id` and `admin.crudlVersion` admin attributes
    - Using the new custom field component logic.
    - Using the new field props logic (all field descriptor attributes are now considered props)
    - Using the new add/edit relations logic
* NEW: Bulk actions examples (tags, sections and categories)

## 0.2.0 (2016-01-26)
* NEW: compatibility with CRUDL 0.2.0
* NEW: using CDN to serve CRUDL core (js/css).
* ADDED: Add/edit relations.
* ADDED: Custom messages and enabled translations.
* ADDED: Multiple base API URLs are supported. Connectors can override the default base URL.
* ADDED: Permissions. A user can define per-action permissions in a descriptor or they may be included in an API call response.
* IMPROVED: Folder structure and terminology.

## 0.1.1 (2016-09-12)
* core: fixed bug with logout
* core: improved position of breadcrumbs

## 0.1.0 (2016-09-09)
* initial release

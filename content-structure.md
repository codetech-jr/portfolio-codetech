# Sanity Content Structure Summary

This document describes the data models used in the Sanity CMS for this portfolio project.

## Document Types

### 1. Post (`postType.js`)
The primary content type for blog articles.
- **Fields**:
    - `title`: String (Required)
    - `slug`: Slug (URL friendy path)
    - `mainImage`: Image with Alt text
    - `excerpt`: Short summary (Max 200 chars)
    - `body`: Portable Text (Block Content)
    - `author`: Reference to Author
    - `categories`: Array of references to Category
    - `tags`: Array of references to Tag
    - `publishedAt`: Datetime
    - `views/likes/shares`: Numbers (Read-only)
- **SEO Support**: Includes specific fields for `seoTitle`, `seoDescription`, and `seoImage`.

### 2. Author (`authorType.js`)
Represents content creators.
- **Fields**: Name, Image, Bio.

### 3. Category/Tag (`categoryType.js`, `tagType.js`)
Taxonomies for organizing posts.

### 4. Comment (`commentType.js`)
User feedback on posts.

---
*Note: This structure is designed for a robust blogging system with integrated SEO and social media metadata.*

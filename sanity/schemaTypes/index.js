// sanity/schemaTypes/index.js

// Importamos desde los nombres de archivo CORRECTOS
import authorType from './authorType'
import categoryType from './categoryType'
import blockContentType from './blockContentType'
import postType from './postType'
import tagType from './tagType'
import commentType from './commentType'
import newsletterSubscriberType from './newsletterSubscriberType'

// Los exportamos en el array
export const schemaTypes = [
  postType,
  authorType,
  categoryType,
  blockContentType,
  tagType,
  commentType,
  newsletterSubscriberType,
]
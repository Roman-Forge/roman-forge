import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description:
        'Short summary for the journal list. Also used as the meta description when that field is empty. One or two sentences.',
      validation: (rule) =>
        rule
          .max(300)
          .warning('Aim for one or two sentences so the journal card stays readable.'),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      fieldset: 'seo',
      description: 'Optional search title. The post title is used when this is empty.',
      validation: (rule) =>
        rule.max(70).warning('Titles longer than about 70 characters are often cut off in search results.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      fieldset: 'seo',
      description:
        'Optional search and social description. The excerpt is used when this is empty.',
      validation: (rule) =>
        rule
          .max(160)
          .warning('Descriptions longer than 160 characters are often cut off in search results.'),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      description:
        'Mark a case study by assigning the category titled "Case Study" (slug: case-study). Create that category once, then reuse it. The journal list can filter on it.',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      category: 'categories.0.title',
    },
    prepare({title, author, media, category}) {
      const parts = [author && `by ${author}`, category].filter(Boolean)
      return {title, media, subtitle: parts.join(' · ')}
    },
  },
})

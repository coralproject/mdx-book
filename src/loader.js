/* eslint-disable @typescript-eslint/no-var-requires */
const mdx = require("@mdx-js/mdx");
const matter = require("gray-matter");
const stringifyObject = require("stringify-object");

const RendererImports = `
import React from 'react'
import { mdx } from '@mdx-js/react'
`;

module.exports = async function (src) {
  let callback = this.async();
  callback = this.async();
  const { content, data } = matter(src);

  const options = {
    remarkPlugins: [require("remark-docz")],
    rehypePlugins: [require("rehype-docz"), require("rehype-slug")],
    filepath: this.resourcePath,
  };

  let result;

  try {
    result = await mdx(content, options);
  } catch (err) {
    return callback(err);
  }

  // Exports frontMatter directly in mdx.
  const frontmatterExport = `export const frontMatter = ${stringifyObject(
    data
  )};`;
  const code = `${RendererImports}\n
${frontmatterExport}\n${result}`;

  return callback(null, code);
};

import React from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { ArticleContent, ArticleComments } from 'my-app';
 
const Article = ({ articleId }) => (
  <div>
    <ArticleContent id={articleId} />
    <LazyLoadComponent>
      <ArticleComments id={articleId} />
    </LazyLoadComponent>
  </div>
);
 
export default Article;
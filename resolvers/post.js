const { gql } = require('apollo-server-express');
const {posts} = require('../temp');

//Query
const totalPosts = () => posts.length;
const allPosts = () => posts;

//mutation
const newPost = (parent, args) => {
     console.log(args);
     //Create new post object
     const post = {
          id: posts.length+1,
          title: args.title,
          description: args.description
     }

     //push new post object to post array
     posts.push(post);
     return post;
}
module.exports = {
     Query: {
          totalPosts,
          allPosts
     },

     Mutation: {
          newPost
     }
}
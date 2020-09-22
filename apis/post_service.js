import { db, firebase } from "~/plugins/firebase";

export const PostService = {
  async query() {
    const postsCollection = await db
      .collection("posts")
      .orderBy("timestamp", "desc");

    var posts = [];
    const postsQuerySnapshot = await postsCollection.get();
    postsQuerySnapshot.forEach(doc => {
      posts.push(doc.data());
    });

    return posts;
  },

  async create(post) {
    const postId = String(post.id);
    let postsCollection = db.collection("posts").doc(postId);
    postsCollection.set(post);
  }
};

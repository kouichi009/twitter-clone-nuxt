import { db, firebase } from "~/plugins/firebase";

export const state = () => ({
  posts: [],
  user: null
});

export const actions = {
  async queryPosts({ state, commit }) {
    const postsCollection = await db
      .collection("posts")
      .orderBy("timestamp", "desc");

    var posts = [];
    const postsQuerySnapshot = await postsCollection.get();
    postsQuerySnapshot.forEach(doc => {
      posts.push(doc.data());
    });

    commit("setPosts", posts);
  },

  createPost({ state, commit }, { content, user }) {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const postId = db.collection("posts").doc().id;
    const post = {
      id: postId,
      timestamp: timestamp,
      content: content,
      user: {
        uid: user.uid,
        profileImageUrl: user.profileImageUrl,
        name: user.name
      }
    };
    let postsCollection = db.collection("posts").doc(postId);
    postsCollection.set(post);
    commit("insertPost", post);
  },

  checkAuth({ state, commit }) {
    firebase.auth().onAuthStateChanged(async function(user) {
      console.log(user);
      if (user) {
        let uid = user.uid;
        console.log(user);
        console.log(uid);
        const docRef = await db
          .collection("users")
          .doc(uid)
          .get();
        user = docRef.data();
        console.log(user);
        commit("setAuth", user);
      } else {
        // No Auth yet
        commit("setAuth", null);
      }
    });
  },

  async signup({ state, commit }, { name, email, password, imgFile }) {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    let uuid = db.collection("users").doc().id;

    var storageRef = firebase
      .storage()
      .ref()
      .child("tmp/" + uuid + imgFile.name);

    let uploadTask = await storageRef.put(imgFile);
    let url = await uploadTask.ref.getDownloadURL();
    const user = {
      timestamp: timestamp,
      name: name,
      email: email,
      profileImageUrl: url,
      uid: response.user.uid
    };

    let usersCollection = db.collection("users").doc(user.uid);
    usersCollection.set(user);

    commit("setAuth", user);
  },

  async signin({ state, commit }, { email, password }) {
    let response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    console.log("success login", response.user.uid);
    const users_Ref = db.collection("users").doc(response.user.uid);
    const docRef = await users_Ref.get();
    let user = docRef.data();
    console.log(user);
    commit("setAuth", user);
  }
};

export const mutations = {
  insertPost(state, post) {
    state.posts.splice(0, 0, post);
  },

  setPosts(state, posts) {
    state.posts = posts;
  },

  setAuth(state, user) {
    state.user = user;
  }
};

export const getters = {
  posts(state) {
    return state.posts;
  },

  user(state) {
    return state.user;
  }
};

import { db, firebase } from "~/plugins/firebase";
export const AuthService = {
  async checkAuth() {
    return new Promise(async (resolve, reject) => {
      await firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          const docRef = await db
            .collection("users")
            .doc(user.uid)
            .get();
          if (docRef.exists) {
            resolve(docRef.data());
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
          // No Auth yet
        }
      });
    });
  }
};

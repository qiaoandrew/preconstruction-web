import { auth } from '@/lib/firebase';
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updateProfile,
  updatePassword,
  deleteUser,
} from 'firebase/auth';
import { createUserDocument } from './userDocument';

export const logIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  await createUserDocument(user?.uid as string);
};

export const logInWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
  const user = userCredential.user;
  await createUserDocument(user?.uid as string);
};

export const signUp = async (name: string, email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await changeDisplayName(name);
  const user = userCredential.user;
  await createUserDocument(user?.uid as string);
};

export const logOut = async () => {
  await signOut(auth);
};

export const resetPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};

export const changeDisplayName = async (displayName: string) => {
  if (!auth.currentUser) throw new Error('auth/no-current-user');
  await updateProfile(auth.currentUser, {
    displayName,
  });
};

export const changeEmail = async (email: string, password: string) => {
  if (!auth.currentUser) throw new Error('auth/no-current-user');
  const credentials = EmailAuthProvider.credential(
    auth.currentUser.email || '',
    password
  );
  await reauthenticateWithCredential(auth.currentUser, credentials);
  await updateEmail(auth.currentUser, email);
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  if (!auth.currentUser) throw new Error('auth/no-current-user');
  const credentials = EmailAuthProvider.credential(
    auth.currentUser.email || '',
    currentPassword
  );
  await reauthenticateWithCredential(auth.currentUser, credentials);
  await updatePassword(auth.currentUser, newPassword);
};

export const deleteAccount = async (password: string) => {
  if (!auth.currentUser) throw new Error('auth/no-current-user');
  const credentials = EmailAuthProvider.credential(
    auth.currentUser.email || '',
    password
  );
  await reauthenticateWithCredential(auth.currentUser, credentials);
  await deleteUser(auth.currentUser);
};

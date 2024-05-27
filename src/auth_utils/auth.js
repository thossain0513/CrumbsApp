
import supabase from './supabaseClient';

export const signUp = async (email, password) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Error signing up:', error.message);
    return { error };
  } else {
    console.log('User signed up:', user);
    return { user };
  }
};

export const signIn = async (email, password) => {
  const { user, error } = await supabase.auth.signIn({
    email,
    password,
  });

  if (error) {
    console.error('Error signing in:', error.message);
    return { error };
  } else {
    console.log('User signed in:', user);
    return { user };
  }
};

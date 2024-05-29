
import supabase from './supabaseClient';

export const signUp = async (email, password) => {
  console.log('Signing up...');
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Error signing up:', error.message);
    return { error };
  } else {
    console.log('User signed up:', data.user);
    return { user: data.user };
  }
};

export const signIn = async (email, password) => {
  console.log('Signing in...');
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Error signing in:', error.message);
    return { error };
  } else {
    console.log('User signed in:', data.user);
    return { user: data.user };
  }
};

import { writable } from 'svelte/store';

export const count = writable(localStorage.getItem('count') || 0);
export const editMode = writable(localStorage.getItem('editMode') || false);
export const save = writable('default');
export const theme = writable(localStorage.getItem('theme') || 'dark');
export const splits = writable(
  JSON.parse(localStorage.getItem('splits')) || false,
);

count.subscribe((val) => localStorage.setItem('count', val));
save.subscribe((val) => localStorage.setItem('save', val));
theme.subscribe((val) => localStorage.setItem('theme', val));
splits.subscribe((val) => localStorage.setItem('splits', val));

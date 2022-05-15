import { writable } from 'svelte/store';

export const save = writable(localStorage.getItem('save') || 'default');
export const split = writable(localStorage.getItem('split') || 'default');
export const count: any = writable(localStorage.getItem('count') || 0);
export const splitCount: any = writable(
  localStorage.getItem('splitCount') || 0,
);
export const editMode: any = writable(
  localStorage.getItem('editMode') || false,
);
export const theme = writable(localStorage.getItem('theme') || 'dark');
export const splitsEnabled = writable(
  JSON.parse(localStorage.getItem('splits')) || false,
);
export const splitList = writable([]);

save.subscribe((val) => localStorage.setItem('save', val));
split.subscribe((val) => localStorage.setItem('split', val));
count.subscribe((val) => localStorage.setItem('count', val));
splitCount.subscribe((val) => localStorage.setItem('splitCount', val));
editMode.subscribe((val) => localStorage.setItem('editMode', val));
theme.subscribe((val) => localStorage.setItem('theme', val));
splitsEnabled.subscribe((val) => localStorage.setItem('splits', val));

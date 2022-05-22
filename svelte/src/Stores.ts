import { writable } from 'svelte/store';

export const save = writable(localStorage.getItem('save') || 'default');
export const split = writable(localStorage.getItem('split') || null);
export const count: any = writable(localStorage.getItem('count') || null);
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
export const saveList = writable([]);
export const splitActive = writable(
  JSON.parse(localStorage.getItem('splitActive')) || false,
);
export const hotkeys: any = writable(
  JSON.parse(localStorage.getItem('hotkeys')) || ['A'],
);
export const dayChartData = writable({
  labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
  datasets: [
    {
      name: 'test',
      values: [10, 12, 3, 9, 8, 15, 9],
    },
  ],
});
export const splitChartData = writable({
  labels: ['label', 'label2'],
  datasets: [{ name: 'deaths', values: [1, 2] }],
});

save.subscribe((val) => localStorage.setItem('save', val));
split.subscribe((val) => localStorage.setItem('split', val));
count.subscribe((val) => localStorage.setItem('count', val));
splitCount.subscribe((val) => localStorage.setItem('splitCount', val));
editMode.subscribe((val) => localStorage.setItem('editMode', val));
theme.subscribe((val) => localStorage.setItem('theme', val));
splitsEnabled.subscribe((val) => localStorage.setItem('splits', val));
splitActive.subscribe((val) => {
  localStorage.setItem('splitActive', val);
});
hotkeys.subscribe((val) =>
  localStorage.setItem('hotkeys', JSON.stringify(val)),
);

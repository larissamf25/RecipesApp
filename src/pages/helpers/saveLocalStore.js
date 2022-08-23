const saveLocalStore = (key, data) => localStorage
  .setItem(key, JSON.stringify(data));

export default saveLocalStore;

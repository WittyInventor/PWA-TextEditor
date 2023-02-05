import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the ase');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  // .add() method on store and pass in the content.
  const request = store.add({ value: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');

// connecting to jate database
  const jateDb = await openDB('jate', 1);

  // Every time you read something from the database its a new transaction in the jate database and the data privilege is the readonly.
  const tx = jateDb.transaction('jate', 'readonly');

  // getting the object in the jate database
  const store = tx.objectStore('jate');

  // getAll() method to get all data in database. the request variable is requesting to get all information in the object: store. 
  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();

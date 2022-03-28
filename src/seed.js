import { collection, getFirestore, addDoc } from "firebase/firestore"
// NOTE: replace 'WmsiEAxs5RXexC3ym7MnKGg9xYY2' with your Firebase auth user id (can be taken from Firebase)
export function seedDatabase(firebase) {
    const db = getFirestore(firebase);
    const photosRef = collection(db, "photos")
    const usersRef = collection(db, "users")

    const users = [
      {
        userId: 'WmsiEAxs5RXexC3ym7MnKGg9xYY2',
        username: 'Counsel',
        fullName: 'Okpabi Counsel',
        emailAddress: 'okpabicounsel@gmail.com',
        following: ['2'],
        followers: ['2', '3', '4'],
        dateCreated: Date.now()
      },
      {
        userId: '2',
        username: 'fred',
        fullName: 'Fred Tom',
        emailAddress: 'fredtom@gmail.com',
        following: [],
        followers: ['WmsiEAxs5RXexC3ym7MnKGg9xYY2'],
        dateCreated: Date.now()
      },
      {
        userId: '3',
        username: 'dali',
        fullName: 'Salvador Dali',
        emailAddress: 'salvador@dali.com',
        following: [],
        followers: ['WmsiEAxs5RXexC3ym7MnKGg9xYY2'],
        dateCreated: Date.now()
      },
      {
        userId: '4',
        username: 'orwell',
        fullName: 'George Orwell',
        emailAddress: 'george@orwell.com',
        following: [],
        followers: ['WmsiEAxs5RXexC3ym7MnKGg9xYY2'],
        dateCreated: Date.now()
      }
    ];
  
    // eslint-disable-next-line prefer-const
    for (let k = 0; k < users.length; k++) {
    addDoc(usersRef, users[k]);
    }
  
    // eslint-disable-next-line prefer-const
    for (let i = 1; i <= 5; ++i) {
    
        addDoc(photosRef, {
          photoId: i,
          userId: '2',
          imageSrc: `/images/users/raphael/${i}.jpg`,
          caption: 'Saint George and the Dragon',
          likes: [],
          comments: [
            {
              displayName: 'dle',
              comment: 'Nice place, thinking of paying a visit soon'
            },
            {
              displayName: 'orwell',
              comment: 'Does this image loook presentable'
            }
          ],
          userLatitude: '40.7128°',
          userLongitude: '74.0060°',
          dateCreated: Date.now()
        });
    }
  }
  
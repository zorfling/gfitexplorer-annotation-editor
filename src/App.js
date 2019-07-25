import React, { useState, useEffect } from 'react';
import { parse, format } from 'date-fns';
import Box from '@material-ui/core/Box';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import db, { firebase, uiConfig } from './firebase';
import Annotation from './components/Annotation';

function App() {
  const collection = db.collection('annotations');
  const sortedCollection = collection.orderBy('date', 'desc');

  const [annotations, setAnnotations] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    const handleNewMessages = querySnapshot => {
      let annotationsArray = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        data.date = format(parse(data.date.toDate()), 'YYYY-MM-DD');
        data.id = doc.id;
        annotationsArray.push(data);
      });
      setAnnotations(annotationsArray);
    };
    sortedCollection.onSnapshot(handleNewMessages);
    return () => {
      // cleanup
    };
  }, [sortedCollection]);

  const saveAnnotation = (id, annotation) => {
    collection
      .doc(id)
      .set(annotation)
      .then(function() {
        console.log('Document successfully written!');
      })
      .catch(function(error) {
        console.error('Error writing document: ', error);
      });
  };

  return (
    <div className="App" style={{ display: 'flex', flexWrap: 'wrap' }}>
      {user ? (
        <div>
          Logged in as {user.displayName}
          <br />
          <button onClick={() => firebase.auth().signOut()}>Logout</button>
        </div>
      ) : (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}

      <Box key="new" padding={2}>
        <Annotation
          id=""
          date={format(new Date(), 'YYYY-MM-DD')}
          handleSave={saveAnnotation}
        />
      </Box>
      {annotations.map(annotation => (
        <Box key={annotation.id} padding={2}>
          <Annotation
            id={annotation.id}
            {...annotation}
            handleSave={saveAnnotation}
          />
        </Box>
      ))}
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { parse, format } from 'date-fns';

import SimpleCard from './SimpleCard';

function Annotation(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [date, setDate] = useState(props.date || '');
  const [annotation, setAnnotation] = useState(props.annotation || '');
  const [annotationText, setAnnotationText] = useState(
    props.annotationText || ''
  );
  let { id, handleSave } = props;
  const buttonHandler = () => {
    if (isEditing) {
      const isNew = id === '';
      console.log('We should save this now');
      if (isNew) {
        id = format(parse(date), 'YYYY-MM-DD');
      }
      handleSave(id, { annotation, annotationText, date: parse(date) });

      if (isNew) {
        setDate(format(new Date(), 'YYYY-MM-DD'));
        setAnnotation('');
        setAnnotationText('');
      }
    }
    setIsEditing(!isEditing);
  };
  return (
    <SimpleCard
      buttonText={isEditing ? (id !== '' ? 'Save' : 'Create') : 'Edit'}
      buttonHandler={buttonHandler}
    >
      <Box>
        <TextField
          label="Date"
          value={date}
          onChange={evt => setDate(evt.target.value)}
          margin="normal"
          disabled={!isEditing}
        />
      </Box>
      <Box>
        <TextField
          label="Annotation"
          value={annotation}
          onChange={evt => setAnnotation(evt.target.value)}
          margin="normal"
          disabled={!isEditing}
        />
      </Box>
      <Box>
        <TextField
          label="Description"
          value={annotationText}
          onChange={evt => setAnnotationText(evt.target.value)}
          margin="normal"
          disabled={!isEditing}
        />
      </Box>
    </SimpleCard>
  );
}

export default Annotation;

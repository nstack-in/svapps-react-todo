import React, { useState,useEffect } from 'react';

function DedicatedPage({ match }) {
  const { params } = match;
  const [todo, updateTodo] = useState({});

  useEffect(function () {
    const localData = localStorage.getItem('todo');
    const dataAsArray = JSON.parse(localData);
    if (dataAsArray === null || dataAsArray === undefined) {
      updateTodo({});
    } else {
      dataAsArray.forEach(function (item) {
        if (item.name === params.id)
          updateTodo(item);
      });
    }
  }, []);


  return <h1>{JSON.stringify(todo)}</h1>;
}

export default DedicatedPage;

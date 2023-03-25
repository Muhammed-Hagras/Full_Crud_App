import React from 'react'
import { Button, ButtonGroup } from "react-bootstrap";

export default function PostListItem({data, deleteRecord}) {
    const records = data.map((el, idx) => (
        <tr key={el.id}>
          <td>#{++idx}</td>
          <td>{el.title}</td>
          <td>
            <ButtonGroup aria-label="Basic example">
              <Button variant="success">Edit</Button>
              <Button variant="danger" onClick={() => deleteRecord(el.id)}>Delete</Button>
            </ButtonGroup>
          </td>
        </tr>
      ));

  return (
    <> 
    {records}
    </>
  )
}

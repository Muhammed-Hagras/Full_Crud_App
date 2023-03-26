import React from 'react'
import { Button, ButtonGroup } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom"

export default function PostListItem({data, deleteRecord, isLoggedIn}) {
  const navigate = useNavigate();
    const deleteHandler =(id) => {
        var result = window.confirm("Are you sure to delete?");
        if(result){
            // Delete logic goes here
            deleteRecord(id)
        }
    }

    const records = data.map((el, idx) => (
        <tr key={el.id}>
          <td>#{++idx}</td>
          <td>
            <NavLink to={`post/${el.id}`}>{el.title}</NavLink>
          </td>
          <td>
            <ButtonGroup aria-label="Basic example">
              <Button variant="success" onClick={() => navigate(`post/${el.id}/edit`)}>Edit</Button>
              <Button variant="danger" onClick={() => deleteHandler(el.id)}  disabled={!isLoggedIn}>Delete</Button>
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

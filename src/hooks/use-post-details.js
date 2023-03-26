import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getPost } from "../state/postSlice";

import { useEffect } from 'react'

export default function usePostDetails() {
    const { loading, error, record } = useSelector(state=> state.posts);
    const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPost(id))
  }, [dispatch, id]);

  return { id, loading, error, record }
}

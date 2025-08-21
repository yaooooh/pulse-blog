import { useDispatch } from "react-redux";
import { setTags } from "../store/article.slice";
import { getTagList } from "../request/tag.request";
import { useEffect } from "react";

const usePrefetch = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getTagList().then(res => {
      dispatch(setTags(res.data));
    })
  }, [])
}


export {
  usePrefetch
}
